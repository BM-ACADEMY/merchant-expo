const GrocerySeller = require('../models/grocerySellerModel');

/**
 * Get all grocery sellers (with pagination)
 */
exports.getAllGrocerySellers = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const skip = (page - 1) * limit;

        const totalRecords = await GrocerySeller.countDocuments();
        const totalPages = Math.ceil(totalRecords / limit);

        const sellers = await GrocerySeller.find()
            .populate("user_id")
            .populate("address_id")
            .skip(skip)
            .limit(limit);

        res.json({
            statusCode: 200,
            success: true,
            message: "Grocery Sellers fetched successfully",
            data: sellers,
            pagination: { currentPage: page, totalPages, totalRecords, perPage: limit },
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message || "Failed to fetch sellers",
        });
    }
};

/**
 * Get a single grocery seller by ID
 */
exports.getGrocerySellerById = async (req, res) => {
    try {
        const seller = await GrocerySeller.findById(req.params.id)
            .populate("user_id")
            .populate("address_id");

        if (!seller) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Grocery Seller not found",
            });
        }

        res.json({
            statusCode: 200,
            success: true,
            message: "Grocery Seller fetched successfully",
            data: seller,
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message || "Failed to fetch seller",
        });
    }
};

/**
 * Create a new grocery seller
 */
exports.createGrocerySeller = async (req, res) => {
    try {
        const newSeller = new GrocerySeller(req.body);
        const savedSeller = await newSeller.save();

        res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Grocery Seller created successfully",
            data: savedSeller,
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message || "Failed to create seller",
        });
    }
};

/**
 * Update grocery seller details
 */
exports.updateGrocerySeller = async (req, res) => {
    try {
        const updatedSeller = await GrocerySeller.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedSeller) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Grocery Seller not found",
            });
        }

        res.json({
            statusCode: 200,
            success: true,
            message: "Grocery Seller updated successfully",
            data: updatedSeller,
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message || "Failed to update seller",
        });
    }
};

/**
 * Delete a grocery seller
 */
exports.deleteGrocerySeller = async (req, res) => {
    try {
        const deletedSeller = await GrocerySeller.findByIdAndDelete(req.params.id);

        if (!deletedSeller) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Grocery Seller not found",
            });
        }

        res.json({
            statusCode: 200,
            success: true,
            message: "Grocery Seller deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message || "Failed to delete seller",
        });
    }
};
