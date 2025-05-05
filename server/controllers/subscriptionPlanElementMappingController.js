
const SubscriptionPlanElementMapping = require('../models/subscriptionPlanElementMappingModel');
// Create new mapping for multiple elements
exports.createMapping = async (req, res) => {
  try {
    const { subscription_plan_id, elements } = req.body;

    if (!subscription_plan_id || !elements || !Array.isArray(elements) || elements.length === 0) {
      return res.status(400).json({ success: false, message: "subscription_plan_id and elements are required" });
    }

    // Loop through the elements and check for duplicates for the given subscription_plan_id
    for (let i = 0; i < elements.length; i++) {
      const { element_id, value } = elements[i];

      if (!element_id || value == null) {
        return res.status(400).json({ success: false, message: "Each element_id and value are required" });
      }

      // Check if the mapping already exists for the given subscription_plan_id and element_id
      const existing = await SubscriptionPlanElementMapping.findOne({ subscription_plan_id, element_id });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Mapping already exists for subscription_plan_id: ${subscription_plan_id} and element_id: ${element_id}`
        });
      }

      // Create new mapping entry
      await SubscriptionPlanElementMapping.create({ subscription_plan_id, element_id, value });
    }

    res.status(201).json({
      success: true,
      message: "Subscription Mapping(s) Created Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Update mapping for multiple elements
exports.updateMapping = async (req, res) => {
  try {
    const { subscription_plan_id, elements } = req.body;

    if (!subscription_plan_id || !elements || !Array.isArray(elements) || elements.length === 0) {
      return res.status(400).json({ success: false, message: "subscription_plan_id and elements are required" });
    }

    // Loop through the elements and update them for the given subscription_plan_id
    for (let i = 0; i < elements.length; i++) {
      const { element_id, value } = elements[i];

      if (!element_id || value == null) {
        return res.status(400).json({ success: false, message: "Each element_id and value are required" });
      }

      // Check if the mapping exists for the given subscription_plan_id and element_id
      const mapping = await SubscriptionPlanElementMapping.findOne({ subscription_plan_id, element_id });
      if (!mapping) {
        return res.status(404).json({
          success: false,
          message: `Mapping not found for subscription_plan_id: ${subscription_plan_id} and element_id: ${element_id}`
        });
      }

      // Update the mapping entry
      mapping.value = value;
      await mapping.save();
    }

    res.json({
      success: true,
      message: "Subscription Mapping(s) Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getMappingById = async (req, res) => {
    try {
        const mapping = await SubscriptionPlanElementMapping.findByPk(req.params.id);
        if (!mapping) return res.status(404).json({ message: "Mapping not found" });
        res.json(mapping);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all mappings grouped by subscription_plan_id
exports.getAllMappings = async (req, res) => {
  try {
    const mappings = await SubscriptionPlanElementMapping.aggregate([
      {
        $lookup: {
          from: "subscriptionplans",
          localField: "subscription_plan_id",
          foreignField: "_id",
          as: "subscription_plan"
        }
      },
      { $unwind: "$subscription_plan" },
      {
        $lookup: {
          from: "subscriptionplanelements",
          localField: "element_id",
          foreignField: "_id",
          as: "element"
        }
      },
      { $unwind: "$element" },

      // Optional: Add fields explicitly
      {
        $addFields: {
          element_id: "$element._id",
          element_name: "$element.element_name",
          element_value: "$value"
        }
      },

      {
        $group: {
          _id: "$subscription_plan_id",
          subscription_plan: { $first: "$subscription_plan" },
          elements: {
            $push: {
              element_id: "$element_id",
              element_name: "$element_name",
              value: "$element_value"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          subscription_plan_id: {
            _id: "$subscription_plan._id",
            plan_name: "$subscription_plan.plan_name",
            price: "$subscription_plan.price",
            status: "$subscription_plan.status"
          },
          elements: 1
        }
      }
    ]);

    res.json({
      success: true,
      message: "Fetched grouped mappings with full element info successfully",
      data: mappings
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




// Delete a specific mapping
exports.deleteMapping = async (req, res) => {
  try {
    const { subscription_plan_id, element_id } = req.body;  // Expecting the deletion request to pass the plan and element id

    if (!subscription_plan_id) {
      return res.status(400).json({ success: false, message: "subscription_plan_id is required" });
    }

    // If element_id is provided, delete the specific element mapping
    if (element_id) {
      const mapping = await SubscriptionPlanElementMapping.findOneAndDelete({
        subscription_plan_id,
        element_id,
      });

      if (!mapping) {
        return res.status(404).json({ success: false, message: "Mapping not found" });
      }

      res.json({ success: true, message: "Element deleted successfully" });
    } else {
      // If no element_id is provided, delete all elements in the plan
      const result = await SubscriptionPlanElementMapping.deleteMany({ subscription_plan_id });

      if (!result.deletedCount) {
        return res.status(404).json({ success: false, message: "No elements found for this plan" });
      }

      res.json({ success: true, message: "All elements deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

