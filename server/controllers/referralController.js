const Referral = require('../models/referralModel');

// Create Referral
exports.createReferral = async (req, res) => {
    try {
        const { referred_user_id, referral_code_used, points_awarded } = req.body;
        const referral = await Referral.create({ referred_user_id, referral_code_used, points_awarded });
        res.status(201).json(referral);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Referrals
exports.getAllReferrals = async (req, res) => {
    try {
        const referrals = await Referral.findAll();
        res.json(referrals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Referral by ID
exports.getReferralById = async (req, res) => {
    try {
        const referral = await Referral.findByPk(req.params.id);
        if (!referral) return res.status(404).json({ message: "Referral not found" });
        res.json(referral);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Referral
exports.updateReferral = async (req, res) => {
    try {
        const { referred_user_id, referral_code_used, points_awarded } = req.body;
        const referral = await Referral.findByPk(req.params.id);
        if (!referral) return res.status(404).json({ message: "Referral not found" });

        await referral.update({ referred_user_id, referral_code_used, points_awarded });
        res.json(referral);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Referral
exports.deleteReferral = async (req, res) => {
    try {
        const referral = await Referral.findByPk(req.params.id);
        if (!referral) return res.status(404).json({ message: "Referral not found" });

        await referral.destroy();
        res.json({ message: "Referral deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
