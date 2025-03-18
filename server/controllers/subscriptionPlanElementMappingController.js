const SubscriptionPlanElementMapping = require('../models/subscriptionPlanElementMapping.model');

// Create a new mapping
exports.createMapping = async (req, res) => {
    try {
        const { subscription_plan_id, element_id, value } = req.body;
        const mapping = await SubscriptionPlanElementMapping.create({ subscription_plan_id, element_id, value });
        res.status(201).json(mapping);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all mappings
exports.getAllMappings = async (req, res) => {
    try {
        const mappings = await SubscriptionPlanElementMapping.findAll();
        res.json(mappings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific mapping by ID
exports.getMappingById = async (req, res) => {
    try {
        const mapping = await SubscriptionPlanElementMapping.findByPk(req.params.id);
        if (!mapping) return res.status(404).json({ message: "Mapping not found" });
        res.json(mapping);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a mapping
exports.updateMapping = async (req, res) => {
    try {
        const { subscription_plan_id, element_id, value } = req.body;
        const mapping = await SubscriptionPlanElementMapping.findByPk(req.params.id);
        if (!mapping) return res.status(404).json({ message: "Mapping not found" });

        await mapping.update({ subscription_plan_id, element_id, value });
        res.json(mapping);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a mapping
exports.deleteMapping = async (req, res) => {
    try {
        const mapping = await SubscriptionPlanElementMapping.findByPk(req.params.id);
        if (!mapping) return res.status(404).json({ message: "Mapping not found" });

        await mapping.destroy();
        res.json({ message: "Mapping deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
