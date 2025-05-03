const RedeemPoints = require('../models/redeemPointsModel');

// Create a new Redeem Point entry
exports.createRedeemPoint = async (req, res) => {
    try {
        const { user_id, coupon_id, redeem_point, coupon_code } = req.body;
        const redeemPoint = await RedeemPoints.create({ user_id, coupon_id, redeem_point, coupon_code });
        res.status(201).json(redeemPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Redeem Points
exports.getAllRedeemPoints = async (req, res) => {
    try {
        const redeemPoints = await RedeemPoints.findAll();
        res.json(redeemPoints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific Redeem Point by ID
exports.getRedeemPointById = async (req, res) => {
    try {
        const redeemPoint = await RedeemPoints.findByPk(req.params.id);
        if (!redeemPoint) return res.status(404).json({ message: "Redeem Point not found" });
        res.json(redeemPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Redeem Point entry
exports.updateRedeemPoint = async (req, res) => {
    try {
        const { user_id, coupon_id, redeem_point, coupon_code } = req.body;
        const redeemPoint = await RedeemPoints.findByPk(req.params.id);
        if (!redeemPoint) return res.status(404).json({ message: "Redeem Point not found" });

        await redeemPoint.update({ user_id, coupon_id, redeem_point, coupon_code });
        res.json(redeemPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Redeem Point entry
exports.deleteRedeemPoint = async (req, res) => {
    try {
        const redeemPoint = await RedeemPoints.findByPk(req.params.id);
        if (!redeemPoint) return res.status(404).json({ message: "Redeem Point not found" });

        await redeemPoint.destroy();
        res.json({ message: "Redeem Point deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
