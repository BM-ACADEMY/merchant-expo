const Point = require("../models/pointsModel");

// Create a new point entry
exports.createPoint = async (req, res) => {
  try {
    const { point_name, point_count } = req.body;

    if (!point_name) {
      return res.status(400).json({ message: "Point name is required" });
    }

    const existingPoint = await Point.findOne({ point_name });
    if (existingPoint) {
      return res.status(400).json({ message: "Point name already exists" });
    }

    const point = new Point({ point_name, point_count });
    await point.save();

    res.status(201).json({ message: "Point entry created successfully", point });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all point entries
exports.getPoints = async (req, res) => {
  try {
    const points = await Point.find();
    res.json(points);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get point entry by ID
exports.getPointById = async (req, res) => {
  try {
    const point = await Point.findById(req.params.id);
    if (!point) {
      return res.status(404).json({ message: "Point entry not found" });
    }
    res.json(point);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update point entry
exports.updatePoint = async (req, res) => {
  try {
    const { point_name, point_count } = req.body;

    if (!point_name || point_count == null) {
      return res.status(400).json({ message: "Point name and count are required" });
    }

    const point = await Point.findByIdAndUpdate(
      req.params.id,
      { point_name, point_count },
      { new: true, runValidators: true }
    );

    if (!point) {
      return res.status(404).json({ message: "Point entry not found" });
    }
    res.json({ message: "Point entry updated successfully", point });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete point entry
exports.deletePoint = async (req, res) => {
  try {
    const point = await Point.findByIdAndDelete(req.params.id);
    if (!point) {
      return res.status(404).json({ message: "Point entry not found" });
    }
    res.json({ message: "Point entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
