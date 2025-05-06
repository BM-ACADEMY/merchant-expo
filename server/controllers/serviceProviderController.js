const ServiceProvider =require('../models/serviceProviderModel');
const User = require("../models/userModel");
const Address = require("../models/addressModel");
const Product = require("../models/productModel");
const ProductAttribute = require("../models/productAttributeModel");

exports.createServiceProvider = async (req, res) => {
    try {
        const serviceProvider = new ServiceProvider({
            ...req.body,
            vehicle_images: req.body.imageUrls,
        });

        await serviceProvider.save();
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Service Provider created successfully',
            data: serviceProvider
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            success: false,
            message: error.message,
        });
    }
};

exports.getAllServiceProviders = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const skip = (page - 1) * limit;

        const totalRecords = await ServiceProvider.countDocuments();
        const totalPages = Math.ceil(totalRecords / limit);

        const serviceProviders = await ServiceProvider.find()
            .populate('user_id')
            .populate('address_id')
            .skip(skip)
            .limit(limit);

        res.json({
            statusCode: 200,
            success: true,
            message: 'Service Providers fetched successfully',
            data: serviceProviders,
            pagination: {
                currentPage: page,
                totalPages,
                totalRecords,
                perPage: limit
            }
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
            data: null
        });
    }
};
exports.getServiceProviderByEmail = async (req, res) => {
    const { email, page = 1, limit = 10 } = req.query;
  
    try {
      if (!email) {
        return res.status(400).json({
          message: "Email query parameter is required.",
        });
      }
  
      // 1. Find the service provider
      const serviceProvider = await ServiceProvider.findOne({ company_email: email });
  
      if (!serviceProvider) {
        return res.json({
          message: `No service provider found with the email: ${email}. Please verify and try again.`,
        });
      }
  
      // 2. Fetch associated user
      const user = await User.findById(serviceProvider.user_id).select("-password");
  
      // 3. Product pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const totalProducts = await Product.countDocuments({ seller_id: serviceProvider._id });
  
      // 4. Fetch paginated products with category relations
      const products = await Product.find({ seller_id: serviceProvider._id })
        .populate("category_id sub_category_id super_sub_category_id deep_sub_category_id")
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });
  
      // 5. Map attributes to each product
      const productsWithAttributes = await Promise.all(
        products.map(async (product) => {
          const attributes = await ProductAttribute.find({ product_id: product._id });
      
          return {
            ...product.toObject(),
            attributes: attributes.map((attr) => ({
              attribute_key: attr.attribute_key,
              attribute_value: attr.attribute_value,
            })),
            category_name: product.category_id?.name || null,
            sub_category_name: product.sub_category_id?.name || null,
            super_sub_category_name: product.super_sub_category_id?.name || null,
            deep_sub_category_name: product.deep_sub_category_id?.name || null,
          };
        })
      );
      
      // 6. Respond
      return res.status(200).json({
        success: true,
        serviceProvider,
        user,
        products: productsWithAttributes,
        pagination: {
          totalProducts,
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalProducts / limit),
          pageSize: parseInt(limit),
        },
      });
    } catch (error) {
      console.error("Error fetching service provider or products:", error);
      return res.status(500).json({
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      });
    }
  };
  
exports.getServiceProviderById = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id).populate('user_id').populate('address_id');
        if (!serviceProvider) return res.status(404).json({
            statusCode: 404,
            success: false,
            message: 'Service Provider not found',
            data: null
        });
        res.json({
            statusCode: 200,
            success: true,
            message: 'Service Provider fetched successfully',
            data: serviceProvider
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
            data: null
        });
    }
};

exports.updateServiceProvider = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);
        if (!serviceProvider) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: 'Service Provider not found',
            });
        }

        Object.assign(serviceProvider, req.body);
        await serviceProvider.save();

        res.json({
            statusCode: 200,
            success: true,
            message: 'Service Provider updated successfully',
            data: serviceProvider
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            success: false,
            message: error.message,
        });
    }
};

exports.deleteServiceProvider = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findByIdAndDelete(req.params.id);
        if (!serviceProvider) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: 'Service Provider not found',
            });
        }

        res.json({
            statusCode: 200,
            success: true,
            message: 'Service Provider deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
        });
    }
};
