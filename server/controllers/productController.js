const Product = require("../models/productModel");
const ProductAttribute=require("../models/productAttributeModel");
const mongoose=require("mongoose")
// Create Product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category_id sub_category_id seller_id");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });

  }}
// Create Product
exports.createProduct = async (req, res) => {
  try {
    const {
      seller_id,
      sellerModel,
      category_id,
      sub_category_id,
      super_sub_category_id,
      deep_sub_category_id,
      product_name,
      description,
      price,
      stock_quantity,
      product_image, // <== updated field
      attributes
    } = req.body;

    const parsedImages = typeof product_image === 'string'
      ? JSON.parse(product_image)
      : product_image;

    const product = new Product({
      seller_id,
      sellerModel,
      category_id,
      sub_category_id,
      super_sub_category_id,
      deep_sub_category_id,
      product_name,
      description,
      price: mongoose.Types.Decimal128.fromString(price),
      stock_quantity,
      product_image: parsedImages || [] // <== save as array
    });

    await product.save();

    const parsedAttributes = typeof attributes === 'string' ? JSON.parse(attributes) : attributes;

    const attributeDocs = parsedAttributes.map(attr => ({
      product_id: product._id,
      attribute_key: attr.key,
      attribute_value: attr.value
    }));

    const savedAttributes = await ProductAttribute.insertMany(attributeDocs);

    product.attributes = savedAttributes.map(attr => attr._id);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
      attributes: savedAttributes
    });

  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};


// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', filter = '' } = req.query; // Default page is 1, limit is 10
    const skip = (page - 1) * limit; // Pagination logic

    // Build filter query for date
    let filterQuery = {};
    if (filter === 'today') {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      filterQuery.createdAt = { $gte: startOfDay };
    } else if (filter === 'last_week') {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      startOfWeek.setHours(0, 0, 0, 0);
      filterQuery.createdAt = { $gte: startOfWeek };
    } else if (filter === 'last_month') {
      const startOfMonth = new Date();
      startOfMonth.setMonth(startOfMonth.getMonth() - 1);
      startOfMonth.setHours(0, 0, 0, 0);
      filterQuery.createdAt = { $gte: startOfMonth };
    }

    // Add search functionality for product name
    if (search) {
      filterQuery.product_name = { $regex: search, $options: 'i' }; 
    }

    // Fetch products with pagination, search, and filter
    const products = await Product.find(filterQuery)
      .populate('category_id sub_category_id super_sub_category_id deep_sub_category_id') // Populating categories
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by most recent

    // Fetch product attributes for each product
    const productsWithAttributes = await Promise.all(products.map(async (product) => {
      const attributes = await ProductAttribute.find({ product_id: product._id }); // Fetch attributes by product_id
      return { ...product.toObject(), attributes }; // Merge attributes into the product object
    }));

    // Get total product count for pagination
    const totalProducts = await Product.countDocuments(filterQuery);

    res.status(200).json({
      success: true,
      products: productsWithAttributes, // Return products with attributes
      pagination: {
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });

  }
};

// Get Single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category_id sub_category_id seller_id");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {

//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.status(200).json({ message: "Product updated successfully", product });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


    const { product_image, ...rest } = req.body;

    const updatedFields = {
      ...rest,
    };

    if (product_image) {
      updatedFields.product_image = typeof product_image === 'string'
        ? JSON.parse(product_image)
        : product_image;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({success:true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({success:false, error: error.message });

  }

}

