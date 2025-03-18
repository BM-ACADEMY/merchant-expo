const SubscriptionPlanElement = require('../models/subscriptionPlanElement.model');

// Create a new subscription plan element
exports.createElement = async (req, res) => {
    try {
        const { element_name } = req.body;
        const element = await SubscriptionPlanElement.create({ element_name });
        res.status(201).json(element);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all subscription plan elements
exports.getAllElements = async (req, res) => {
    try {
        const elements = await SubscriptionPlanElement.findAll();
        res.json(elements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific subscription plan element by ID
exports.getElementById = async (req, res) => {
    try {
        const element = await SubscriptionPlanElement.findByPk(req.params.id);
        if (!element) return res.status(404).json({ message: "Element not found" });
        res.json(element);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a subscription plan element
exports.updateElement = async (req, res) => {
    try {
        const { element_name } = req.body;
        const element = await SubscriptionPlanElement.findByPk(req.params.id);
        if (!element) return res.status(404).json({ message: "Element not found" });

        await element.update({ element_name });
        res.json(element);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a subscription plan element
exports.deleteElement = async (req, res) => {
    try {
        const element = await SubscriptionPlanElement.findByPk(req.params.id);
        if (!element) return res.status(404).json({ message: "Element not found" });

        await element.destroy();
        res.json({ message: "Element deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
