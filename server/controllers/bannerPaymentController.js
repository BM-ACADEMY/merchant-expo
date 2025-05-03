const BannerPayment = require('../models/bannerPaymentModel');

// Create a new payment record
exports.createBannerPayment = async (req, res) => {
    try {
        const { user_id, days, amount, payment_status, transaction_id, status } = req.body;
        const bannerPayment = await BannerPayment.create({ user_id, days, amount, payment_status, transaction_id, status });
        res.status(201).json(bannerPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all banner payments
exports.getAllBannerPayments = async (req, res) => {
    try {
        const payments = await BannerPayment.findAll();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific banner payment by ID
exports.getBannerPaymentById = async (req, res) => {
    try {
        const payment = await BannerPayment.findByPk(req.params.id);
        if (!payment) return res.status(404).json({ message: "Payment record not found" });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a banner payment record
exports.updateBannerPayment = async (req, res) => {
    try {
        const { user_id, days, amount, payment_status, transaction_id, status } = req.body;
        const payment = await BannerPayment.findByPk(req.params.id);
        if (!payment) return res.status(404).json({ message: "Payment record not found" });

        await payment.update({ user_id, days, amount, payment_status, transaction_id, status });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a banner payment record
exports.deleteBannerPayment = async (req, res) => {
    try {
        const payment = await BannerPayment.findByPk(req.params.id);
        if (!payment) return res.status(404).json({ message: "Payment record not found" });

        await payment.destroy();
        res.json({ message: "Payment record deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
