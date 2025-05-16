const TrendingPoints = require('../models/trendingPointsModel');

// 📌 Create or update trending point (unique per user_id + product_id + date)
exports.createTrendingPoint = async (req, res) => {
  try {
    const { user_id, product_id, trending_Points = 1 } = req.body;

    if (!user_id || !product_id) {
      return res.status(400).json({ message: "user_id and product_id are required" });
    }

    const today = new Date().toISOString().split("T")[0];

    // 🔍 Check if user already gave a point today for this product
    const existingPoint = await TrendingPoints.findOne({
      user_id,
      product_id,
      date: today
    });

    if (existingPoint) {
      return res.status(409).json({
        message: "You already gave a trending point for this product today."
      });
    }

    // ✅ Create new trending point
    const newPoint = await TrendingPoints.create({
      user_id,
      product_id,
      trending_Points,
      date: today
    });

    res.status(201).json(newPoint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Get all trending points
exports.getAllTrendingPoints = async (req, res) => {
  try {
    const trendingPoints = await TrendingPoints.find();
    res.json(trendingPoints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Get trending point by ID
exports.getTrendingPointById = async (req, res) => {
  try {
    const trendingPoint = await TrendingPoints.findById(req.params.id);
    if (!trendingPoint) {
      return res.status(404).json({ message: "Trending Point not found" });
    }
    res.json(trendingPoint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Update trending point by ID
exports.updateTrendingPoint = async (req, res) => {
  try {
    const { user_id, product_id, trending_Points, date } = req.body;

    const trendingPoint = await TrendingPoints.findById(req.params.id);
    if (!trendingPoint) {
      return res.status(404).json({ message: "Trending Point not found" });
    }

    trendingPoint.user_id = user_id ?? trendingPoint.user_id;
    trendingPoint.product_id = product_id ?? trendingPoint.product_id;
    trendingPoint.trending_Points = trending_Points ?? trendingPoint.trending_Points;
    trendingPoint.date = date ?? trendingPoint.date;

    await trendingPoint.save();
    res.json(trendingPoint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Delete trending point by ID
exports.deleteTrendingPoint = async (req, res) => {
  try {
    const trendingPoint = await TrendingPoints.findByIdAndDelete(req.params.id);
    if (!trendingPoint) {
      return res.status(404).json({ message: "Trending Point not found" });
    }
    res.json({ message: "Trending Point deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
