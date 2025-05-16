const Category = require("../models/categoryModel");
const TrendingPoints = require("../models/trendingPointsModel");
const Product = require("../models/productModel");
const SubCategory = require("../models/subCategoryModel");
const SuperSubCategory = require("../models/superSubCategoryModel");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { category_name, category_image } = req.body;
  const modifiedName=  category_name
  .toLowerCase()
  .replace(/,/g, '') // Remove commas
  .replace(/&/g, 'and') // Replace ampersands
  .replace(/\s+/g, '-') // Replace spaces with hyphens
  .replace(/[^\w\-]+/g, '') // Remove special characters
  .replace(/\-\-+/g, '-') // Replace multiple hyphens with a single one
  .trim();
    // Check if category already exists
    const existingCategory = await Category.findOne({ category_name:modifiedName });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ category_name:modifiedName, category_image });
    await category.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Category created successfully",
        data: category,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });

  }
};
// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {
      category_name: { $regex: search, $options: "i" },
    };

    const total = await Category.countDocuments(query);

    const categories = await Category.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const enhancedCategories = await Promise.all(
      categories.map(async (category) => {
        // Count products directly under this category
        const productCount = await Product.countDocuments({
          category_id: category._id,
        });

        // Get subcategories of this category
        const subcategories = await SubCategory.find({
          category_id: category._id,
        }).select("_id sub_category_name sub_category_image");

        // Count products for each subcategory
        const enhancedSubcategories = await Promise.all(
          subcategories.map(async (sub) => {
            const subProductCount = await Product.countDocuments({
              sub_category_id: sub._id,
            });

            return {
              subCategoryId: sub._id,
              subCategoryName: sub.sub_category_name,
              subCategoryImage: sub.sub_category_image,
              productCount: subProductCount,
            };
          })
        );

        return {
          categoryId: category._id,
          categoryName: category.category_name,
          categoryImage: category.category_image,
          productCount,
          subcategories: enhancedSubcategories,
        };
      })
    );

    res.json({
      success: true,
      message: "Fetched categories with subcategories and product count successfully",
      data: enhancedCategories,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategoriesByName = async (req, res) => {
  try {
    const { category_name } = req.params;
    console.log(category_name,"category_name");
    const { page = 1 } = req.query;
    const limit = 10;

    if (!category_name || typeof category_name !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid or missing category_name' });
    }

    const pageNum = Number(page);
    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({ success: false, message: 'Invalid page number' });
    }

    const pipeline = [
      {
        $match: {
         category_name: { $regex: `.*${category_name}.*`, $options: 'i' }
        },
      },
      { $skip: (pageNum - 1) * limit },
      { $limit: limit },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: SubCategory.collection.name,
          localField: '_id',
          foreignField: 'category_id',
          as: 'subcategories',
        },
      },
      {
        $lookup: {
          from: Product.collection.name,
          localField: '_id',
          foreignField: 'category_id',
          as: 'category_products',
        },
      },
      {
        $addFields: {
          productCount: { $size: '$category_products' },
        },
      },
      {
        $unwind: {
          path: '$subcategories',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: SuperSubCategory.collection.name,
          localField: 'subcategories._id',
          foreignField: 'sub_category_id',
          as: 'subcategories.superSubcategories',
        },
      },
      {
        $lookup: {
          from: Product.collection.name,
          localField: 'subcategories._id',
          foreignField: 'sub_category_id',
          as: 'subcategories.subProducts',
        },
      },
      {
        $addFields: {
          'subcategories.productCount': { $size: '$subcategories.subProducts' },
        },
      },
      {
        $group: {
          _id: '$_id',
          categoryName: { $first: '$category_name' },
          categoryImage: { $first: '$category_image' },
          productCount: { $first: '$productCount' },
          subcategories: { $push: '$subcategories' },
          category_products: { $first: '$category_products' },
        },
      },
      {
        $project: {
          categoryId: '$_id',
          _id: 0,
          categoryName: 1,
          categoryImage: 1,
          productCount: 1,
          subcategories: {
            $map: {
              input: '$subcategories',
              as: 'sub',
              in: {
                subCategoryId: '$$sub._id',
                subCategoryName: '$$sub.sub_category_name',
                subCategoryImage: '$$sub.sub_category_image',
                productCount: '$$sub.productCount',
                superSubcategories: {
                  $map: {
                    input: '$$sub.superSubcategories',
                    as: 'superSub',
                    in: {
                      superSubCategoryId: '$$superSub._id',
                      superSubCategoryName: '$$superSub.super_sub_category_name',
                      superSubCategoryImage: '$$superSub.super_sub_category_image',
                      productCount: {
                        $size: {
                          $filter: {
                            input: '$category_products',
                            as: 'prod',
                            cond: {
                              $eq: ['$$prod.super_sub_category_id', '$$superSub._id'],
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
   
        },
      },
    ];

    const [categories, total] = await Promise.all([
      Category.aggregate(pipeline).exec(),
      Category.countDocuments({
        category_name: { $regex: `^${category_name}`, $options: 'i' },
      }),
    ]);

    return res.json({
      success: true,
      message: 'Fetched categories with subcategories and super subcategories successfully',
      data: categories,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: pageNum,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSubCategoriesByName = async (req, res) => {
  try {
    const { sub_category_name } = req.params; // Changed from category_name to sub_category
    const { page = 1 } = req.query;
    const limit = 10;

    if (!sub_category_name || typeof sub_category_name !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid or missing sub_category' });
    }

    const pageNum = Number(page);
    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({ success: false, message: 'Invalid page number' });
    }

    // Aggregation pipeline to start from SubCategory
    const pipeline = [
      // Match the subcategory by name
      {
        $match: {
          sub_category_name: { $regex: `.*${sub_category_name}.*`, $options: 'i' },
        },
      },
      { $skip: (pageNum - 1) * limit },
      { $limit: limit },
      { $sort: { createdAt: -1 } },

      // Lookup parent Category details (optional, if you need category info)
      {
        $lookup: {
          from: Category.collection.name,
          localField: 'category_id',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },

      // Lookup SuperSubCategories for the SubCategory
      {
        $lookup: {
          from: SuperSubCategory.collection.name,
          localField: '_id',
          foreignField: 'sub_category_id',
          as: 'superSubcategories',
        },
      },

      // Lookup Products for the SubCategory
      {
        $lookup: {
          from: Product.collection.name,
          localField: '_id',
          foreignField: 'sub_category_id',
          as: 'subProducts',
        },
      },
      {
        $addFields: {
          productCount: { $size: '$subProducts' },
        },
      },

      // Unwind superSubcategories to lookup their DeepSubCategories
      {
        $unwind: {
          path: '$superSubcategories',
          preserveNullAndEmptyArrays: true,
        },
      },

      // Lookup DeepSubCategories for each SuperSubCategory
      {
        $lookup: {
          from: 'deepsubcategories', // Adjust to your DeepSubCategory collection name
          localField: 'superSubcategories._id',
          foreignField: 'super_sub_category_id',
          as: 'superSubcategories.deepSubcategories',
        },
      },

      // Lookup Products for each SuperSubCategory
      {
        $lookup: {
          from: Product.collection.name,
          localField: 'superSubcategories._id',
          foreignField: 'super_sub_category_id',
          as: 'superSubcategories.superSubProducts',
        },
      },
      {
        $addFields: {
          'superSubcategories.productCount': { $size: '$superSubcategories.superSubProducts' },
        },
      },

      // Unwind deepSubcategories to lookup their products (if needed)
      {
        $unwind: {
          path: '$superSubcategories.deepSubcategories',
          preserveNullAndEmptyArrays: true,
        },
      },

      // Lookup Products for each DeepSubCategory
      {
        $lookup: {
          from: Product.collection.name,
          localField: 'superSubcategories.deepSubcategories._id',
          foreignField: 'deep_sub_category_id', // Adjust field name as per your schema
          as: 'superSubcategories.deepSubcategories.deepSubProducts',
        },
      },
      {
        $addFields: {
          'superSubcategories.deepSubcategories.productCount': {
            $size: '$superSubcategories.deepSubcategories.deepSubProducts',
          },
        },
      },

      // Group back DeepSubCategories under SuperSubCategories
      {
        $group: {
          _id: {
            subCategoryId: '$_id',
            superSubCategoryId: '$superSubcategories._id',
          },
          subCategoryId: { $first: '$_id' },
          subCategoryName: { $first: '$sub_category_name' },
          subCategoryImage: { $first: '$sub_category_image' },
          productCount: { $first: '$productCount' },
          category: { $first: '$category' },
          superSubcategories: { $first: '$superSubcategories' },
          deepSubcategories: { $push: '$superSubcategories.deepSubcategories' },
        },
      },
      {
        $addFields: {
          'superSubcategories.deepSubcategories': '$deepSubcategories',
        },
      },

      // Group back SuperSubCategories under SubCategory
      {
        $group: {
          _id: '$subCategoryId',
          subCategoryName: { $first: '$subCategoryName' },
          subCategoryImage: { $first: '$subCategoryImage' },
          productCount: { $first: '$productCount' },
          category: { $first: '$category' },
          superSubcategories: { $push: '$superSubcategories' },
        },
      },

      // Final projection to shape the response
      {
        $project: {
          subCategoryId: '$_id',
          _id: 0,
          subCategoryName: 1,
          subCategoryImage: 1,
          productCount: 1,
          category: {
            categoryId: '$category._id',
            categoryName: '$category.category_name',
            categoryImage: '$category.category_image',
          },
          superSubcategories: {
            $map: {
              input: '$superSubcategories',
              as: 'superSub',
              in: {
                superSubCategoryId: '$$superSub._id',
                superSubCategoryName: '$$superSub.super_sub_category_name',
                superSubCategoryImage: '$$superSub.super_sub_category_image',
                productCount: '$$superSub.productCount',
                deepSubcategories: {
                  $map: {
                    input: '$$superSub.deepSubcategories',
                    as: 'deepSub',
                    in: {
                      deepSubCategoryId: '$$deepSub._id',
                      deepSubCategoryName: '$$deepSub.deep_sub_category_name',
                      deepSubCategoryImage: '$$deepSub.deep_sub_category_image',
                      productCount: '$$deepSub.productCount',
                    },
                  },
                },
              },
            },
          },
        },
      },
    ];

    const [subcategories, total] = await Promise.all([
      SubCategory.aggregate(pipeline).exec(),
      SubCategory.countDocuments({
        sub_category_name: { $regex: `^${sub_category_name}`, $options: 'i' },
      }),
    ]);

    return res.json({
      success: true,
      message: 'Fetched subcategory with super subcategories and deep subcategories successfully',
      data: subcategories,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: pageNum,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTopTrendingCategories = async (req, res) => {
  try {
    // Step 1: Get top trending categories
    const topTrendingCategories = await TrendingPoints.aggregate([
      // Group points by product_id
      {
        $group: {
          _id: '$product_id',
          totalPoints: { $sum: '$trending_Points' },
        },
      },
      // Lookup product to get category_id
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      // Group by category_id
      {
        $group: {
          _id: '$product.category_id',
          categoryPoints: { $sum: '$totalPoints' },
        },
      },
      // Lookup category details
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
      // Sort and limit
      { $sort: { categoryPoints: -1 } },
      { $limit: 10 },
    ]);

    // Step 2: Fetch all subcategories and super-subcategories for "All Categories"
    const allSubCategories = await SubCategory.find({})
      .select('_id category_id sub_category_name sub_category_image');
    const allSuperSubCategories = await SuperSubCategory.find({})
      .select('_id sub_category_id super_sub_category_name');

    // Step 3: Build "All Categories" entry with a default image
    const allCategoriesEntry = {
      categoryId: 'all',
      categoryName: 'All Categories',
      image: 'https://via.placeholder.com/600x400?text=All+Categories', // Default image for "All Categories"
      categoryPoints: 0,
      subCategories: allSubCategories.map((sub) => {
        const children = allSuperSubCategories
          .filter((ssc) => ssc.sub_category_id.toString() === sub._id.toString())
          .map((ssc) => ({
            superSubCategoryId: ssc._id,
            name: ssc.super_sub_category_name,
          }));

        return {
          subCategoryId: sub._id,
          subCategoryName: sub.sub_category_name,
          subCategoryImage: sub.sub_category_image,
          superSubCategories: children,
        };
      }),
    };

    // Step 4: Enhance top trending categories
    const enhancedTrendingData = await Promise.all(
      topTrendingCategories.map(async (item) => {
        const category = {
          categoryId: item.category._id,
          categoryName: item.category.category_name,
          image: item.category.category_image || 'https://via.placeholder.com/600x400?text=Category+Image', // Fallback image if category_image is null
          categoryPoints: item.categoryPoints,
        };

        // Fetch sub-categories
        const subCategories = await SubCategory.find({
          category_id: item._id,
        }).select('_id sub_category_name sub_category_image');

        // Fetch super-sub-categories
        const superSubCategories = await SuperSubCategory.find({
          category_id: item._id,
        }).select('_id sub_category_id super_sub_category_name');

        category.subCategories = subCategories.map((sub) => {
          const children = superSubCategories
            .filter((ssc) => ssc.sub_category_id.toString() === sub._id.toString())
            .map((ssc) => ({
              superSubCategoryId: ssc._id,
              name: ssc.super_sub_category_name,
            }));

          return {
            subCategoryId: sub._id,
            subCategoryName: sub.sub_category_name,
            subCategoryImage: sub.sub_category_image,
            superSubCategories: children,
          };
        });

        return category;
      })
    );

    // Step 5: Combine "All Categories" with top trending categories
    const enhancedData = [allCategoriesEntry, ...enhancedTrendingData];

    res.json({
      success: true,
      message: 'Top trending categories with sub-categories fetched successfully',
      data: enhancedData,
    });
  } catch (error) {
    console.error('Top categories error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTopTrendingSubCategories = async (req, res) => {
  try {
    // Step 1: Aggregate trending points by subcategory_id
    const trendingSubCategories = await TrendingPoints.aggregate([
      // Group by product_id to sum trending points
      {
        $group: {
          _id: '$product_id',
          totalPoints: { $sum: '$trending_Points' },
        },
      },
      // Lookup product details to get subcategory_id
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      // Group by subcategory_id and sum points
      {
        $group: {
          _id: '$product.sub_category_id',
          subCategoryPoints: { $sum: '$totalPoints' },
        },
      },
      // Lookup subcategory details
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: '_id',
          as: 'subcategory',
        },
      },
      { $unwind: '$subcategory' },
      // Sort by points and limit to top 20
      { $sort: { subCategoryPoints: -1 } },
      { $limit: 20 },
      // Project the final structure
      {
        $project: {
          subCategoryId: '$_id',
          subCategoryName: '$subcategory.sub_category_name',
          subCategoryImage: '$subcategory.sub_category_image',
          subCategoryPoints: 1,
          _id: 0,
        },
      },
    ]);

    // Step 2: Send the response
    res.json({
      success: true,
      message: 'Top 20 trending subcategories fetched successfully',
      data: trendingSubCategories,
    });
  } catch (error) {
    console.error('Top trending subcategories error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTopTrendingProducts = async (req, res) => {
  try {
    // Step 1: Aggregate trending points by product_id
    const trendingProducts = await TrendingPoints.aggregate([
      // Group by product_id to sum trending points
      {
        $group: {
          _id: '$product_id',
          totalPoints: { $sum: '$trending_Points' },
        },
      },
      // Lookup product details
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      // Lookup product attributes
      {
        $lookup: {
          from: 'productattributes', // Collection name in MongoDB (lowercase, pluralized by Mongoose)
          localField: '_id',
          foreignField: 'product_id',
          as: 'attributes',
        },
      },
      // Sort by points and limit to top 20
      { $sort: { totalPoints: -1 } },
      { $limit: 20 },
      // Project the final structure
      {
        $project: {
          productId: '$_id',
          product: 1, // Include all product fields
          attributes: 1, // Include all attribute fields
          totalPoints: 1,
          _id: 0,
        },
      },
    ]);

    // Step 2: Send the response
    res.json({
      success: true,
      message: 'Top 20 trending products with attributes fetched successfully',
      data: trendingProducts,
    });
  } catch (error) {
    console.error('Top trending products error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategoriesForSuperSubCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({success:true,message:"Fetch Category Successfully",data:categories});
  } catch (error) {
    res.status(500).json({success:false, message: error.message });
  }
};
// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { category_name, category_image } = req.body;
const modifiedName = category_name
  .toLowerCase()
  .replace(/,/g, '') // Remove commas
  .replace(/&/g, 'and') // Replace ampersands
  .replace(/\s+/g, '-') // Replace spaces with hyphens
  .replace(/[^\w\-]+/g, '') // Remove special characters
  .replace(/\-\-+/g, '-') // Replace multiple hyphens
  .trim();
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {   category_name: modifiedName, category_image },

      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({success:false, message: error.message });

  }
};
// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({success:false, message: error.message });

  }
};
