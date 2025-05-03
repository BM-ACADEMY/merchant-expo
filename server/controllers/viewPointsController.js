const ViewPoints = require('../models/viewPointsModel');

// Create a new View Point entry
exports.createViewPoint = async (req, res) => {
    try {
        const { user_id, product_id, view_Points } = req.body;
        const viewPoint = await ViewPoints.create({ user_id, product_id, view_Points });
        res.status(201).json(viewPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all View Points
exports.getAllViewPoints = async (req, res) => {
    try {
        const viewPoints = await ViewPoints.findAll();
        res.json(viewPoints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific View Point by ID
exports.getViewPointById = async (req, res) => {
    try {
        const viewPoint = await ViewPoints.findByPk(req.params.id);
        if (!viewPoint) return res.status(404).json({ message: "View Point not found" });
        res.json(viewPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a View Point entry
exports.updateViewPoint = async (req, res) => {
    try {
        const { user_id, product_id, view_Points } = req.body;
        const viewPoint = await ViewPoints.findByPk(req.params.id);
        if (!viewPoint) return res.status(404).json({ message: "View Point not found" });

        await viewPoint.update({ user_id, product_id, view_Points });
        res.json(viewPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a View Point entry
exports.deleteViewPoint = async (req, res) => {
    try {
        const viewPoint = await ViewPoints.findByPk(req.params.id);
        if (!viewPoint) return res.status(404).json({ message: "View Point not found" });

        await viewPoint.destroy();
        res.json({ message: "View Point deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
