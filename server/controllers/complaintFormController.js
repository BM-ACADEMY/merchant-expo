const Complaint = require("../models/ComplaintFormModel");

// Create Complaint
exports.createComplaint = async (req, res) => {
  try {
    const { type, option, user_id, details } = req.body;

    console.log("Received Request Body:", req.body); // To log and inspect the incoming data

    if (!type || !option || !user_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Assuming 'details' is a nested object that is directly sent in JSON format
    if (!details || typeof details !== "object") {
      return res.status(400).json({ message: "Invalid details format" });
    }

    const complaint = new Complaint({ type, option, user_id, details });
    await complaint.save();

    res
      .status(201)
      .json({ message: "Complaint created successfully", complaint });
  } catch (err) {
    console.error("Error creating complaint:", err);
    res
      .status(500)
      .json({ message: "Error creating complaint", error: err.message });
  }
};

// Get All Complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { type, option } = req.query;

    // Dynamic filter object
    const filter = {};
    if (type) filter.type = type;
    if (option) filter.option = option;

    const total = await Complaint.countDocuments(filter);

    const complaints = await Complaint.find(filter)
      .skip(skip)
      .limit(limit)
      .populate("user_id", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Fetched Complaint Successfully",
      data: complaints,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching complaints",
        error: err.message,
      });
  }
};

// Get Complaint by ID
exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate(
      "user_id",
      "name email"
    );
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });
    res.status(200).json(complaint);
  } catch (err) {
    console.error("Error fetching complaint:", err);
    res
      .status(500)
      .json({ message: "Error fetching complaint", error: err.message });
  }
};

// Update Complaint
exports.updateComplaint = async (req, res) => {
  try {
    const { type, option, user_id, details } = req.body;
    console.log(req.body);
    

    // Assuming 'details' is a nested object that is directly sent in JSON format
    if (!details || typeof details !== "object") {
      return res.status(400).json({ message: "Invalid details format" });
    }

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { type, option, user_id, details },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Complaint not found" });

    res
      .status(200)
      .json({ message: "Complaint updated successfully", complaint: updated });
  } catch (err) {
    console.error("Error updating complaint:", err);
    res
      .status(500)
      .json({ message: "Error updating complaint", error: err.message });
  }
};

// Delete Complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const deleted = await Complaint.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Complaint not found" });

    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    console.error("Error deleting complaint:", err);
    res
      .status(500)
      .json({ message: "Error deleting complaint", error: err.message });
  }
};
