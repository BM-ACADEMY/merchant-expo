const Merchant = require('../models/merchantModel');

exports.createMerchant = async (req, res) => {
    try {
        const merchant = await Merchant.create(req.body);
        res.status(201).json(merchant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllMerchants = async (req, res) => {
    try {
        const merchants = await Merchant.findAll();
        res.status(200).json(merchants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMerchantById = async (req, res) => {
    try {
        const merchant = await Merchant.findByPk(req.params.id);
        if (!merchant) return res.status(404).json({ message: 'Merchant not found' });
        res.status(200).json(merchant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMerchant = async (req, res) => {
    try {
        const merchant = await Merchant.findByPk(req.params.id);
        if (!merchant) return res.status(404).json({ message: 'Merchant not found' });
        await merchant.update(req.body);
        res.status(200).json(merchant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMerchant = async (req, res) => {
    try {
        const merchant = await Merchant.findByPk(req.params.id);
        if (!merchant) return res.status(404).json({ message: 'Merchant not found' });
        await merchant.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
