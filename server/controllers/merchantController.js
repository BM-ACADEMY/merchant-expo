
const Merchant = require("../models/merchantModel");
const User = require("../models/userModel");
const Address = require("../models/addressModel");
const Product=require("../models/productModel")
const ProductAttribute=require("../models/productAttributeModel")
exports.createMerchant = async (req, res) => {
  try {
    console.log("Received payload:", req.body); // Debug log

    const { user_id, address_id, company_email } = req.body;

    // Validate user_id
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({ error: "Invalid user_id" });
    }

    // Validate address_id
    const address = await Address.findById(address_id);
    if (!address) {
      return res.status(400).json({ error: "Invalid address_id" });
    }

    // Validate company_email
    if (!company_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(company_email)) {
      return res.status(400).json({ error: "Invalid company_email" });
    }

    // Check for existing merchant with unique fields
    const existingMerchant = await Merchant.findOne({
      $or: [
        { aadhar: req.body.aadhar },
        { msme_certificate_number: req.body.msme_certificate_number },
        { gst_number: req.body.gst_number },
        { pan: req.body.pan },
        { user_id: req.body.user_id },
      ],
    });

    if (existingMerchant) {
      return res.status(400).json({
        error: "A merchant already exists with the provided aadhar, MSME, GST, PAN, or user_id",
      });
    }

    const merchant = new Merchant(req.body);
    await merchant.save();
    res.status(201).json(merchant);
  } catch (error) {
    console.error("Create merchant error:", error);
    if (error.code === 11000) {
      // Handle duplicate key error
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({ error: `Duplicate value for ${field}` });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

exports.getAllMerchants = async (req, res) => {
  try {
    const merchants = await Merchant.find()
      .populate({ path: "user_id", select: "name email phone_number" })
      .populate({ path: "address_id", select: "street city state country postal_code" });
    res.status(200).json(merchants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getMerchantByEmailOrPhone = async (req, res) => {
  const { email, page = 1, limit = 10 } = req.query;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email query parameter is required." });
    }

    // Step 1: Find merchant
    const merchant = await Merchant.findOne({ company_email: email });

    if (!merchant) {
      return res.json({
        message: `No merchant found with the email address: ${email}. Please verify and try again.`,
      });
    }

    // Step 2: Fetch user
    const user = await User.findById(merchant.user_id).select('-password');

    // Step 3: Product pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Product.countDocuments({ seller_id: merchant._id });

    // Step 4: Fetch paginated products with populated categories
    const products = await Product.find({ seller_id: merchant._id })
      .populate('category_id sub_category_id super_sub_category_id deep_sub_category_id')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    // Step 5: Fetch attributes for each product
    const productsWithAttributes = await Promise.all(
      products.map(async (product) => {
        const attributes = await ProductAttribute.find({ product_id: product._id });
        console.log(`Product ID: ${product._id}, Attributes:`, attributes);
        return {
          ...product.toObject(),
          attributes: attributes.map(attr => ({ attribute_key: attr.attribute_key, attribute_value: attr.attribute_value })),
          category_name: product.category_id?.name || null,
          sub_category_name: product.sub_category_id?.name || null,
          super_sub_category_name: product.super_sub_category_id?.name || null,
          deep_sub_category_name: product.deep_sub_category_id?.name || null
        };
      })
    );

    return res.status(200).json({
      success: true,
      merchant,
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
    console.error("Error fetching merchant or user:", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};


exports.getMerchantById = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id)
      .populate({ path: "user_id", select: "name email phone_number" })
      .populate({ path: "address_id", select: "street city state country postal_code" });
    if (!merchant) return res.status(404).json({ message: "Merchant not found" });
    res.status(200).json(merchant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!merchant) return res.status(404).json({ message: "Merchant not found" });
    res.status(200).json(merchant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.findByIdAndDelete(req.params.id);
    if (!merchant) return res.status(404).json({ message: "Merchant not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

