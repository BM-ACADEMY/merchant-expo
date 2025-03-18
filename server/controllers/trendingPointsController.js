const TrendingPoints = require('../models/trendingPoints.model');

// Create a new Trending Point entry
exports.createTrendingPoint = async (req, res) => {
    try {
        const { user_id, product_id, trending_Points } = req.body;
        const trendingPoint = await TrendingPoints.create({ user_id, product_id, trending_Points });
        res.status(201).json(trendingPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Trending Points
exports.getAllTrendingPoints = async (req, res) => {
    try {
        const trendingPoints = await TrendingPoints.findAll();
        res.json(trendingPoints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific Trending Point by ID
exports.getTrendingPointById = async (req, res) => {
    try {
        const trendingPoint = await TrendingPoints.findByPk(req.params.id);
        if (!trendingPoint) return res.status(404).json({ message: "Trending Point not found" });
        res.json(trendingPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Trending Point entry
exports.updateTrendingPoint = async (req, res) => {
    try {
        const { user_id, product_id, trending_Points } = req.body;
        const trendingPoint = await TrendingPoints.findByPk(req.params.id);
        if (!trendingPoint) return res.status(404).json({ message: "Trending Point not found" });

        await trendingPoint.update({ user_id, product_id, trending_Points });
        res.json(trendingPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Trending Point entry
exports.deleteTrendingPoint = async (req, res) => {
    try {
        const trendingPoint = await TrendingPoints.findByPk(req.params.id);
        if (!trendingPoint) return res.status(404).json({ message: "Trending Point not found" });

        await trendingPoint.destroy();
        res.json({ message: "Trending Point deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
