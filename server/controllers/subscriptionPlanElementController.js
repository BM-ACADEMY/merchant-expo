const SubscriptionPlanElement = require('../models/subscriptionPlanElementModel');

// Create a new subscription plan element
exports.createElement = async (req, res) => {
    try {
        const { element_name } = req.body;
        console.log(req.body);
        
        const element = await SubscriptionPlanElement.create({ element_name });
        res.status(201).json({
            success:true,
            message:"Subscription Element Created Successfully",
            data:element
        });
    } catch (error) {
        res.status(500).json({success:false, error: error.message });
    }
};

// Get all subscription plan elements
exports.getAllElements = async (req, res) => {
    try {
        const elements = await SubscriptionPlanElement.find();
        res.json({
            success:true,
            message:"Fetched Subscription Element Successfully",
            data:elements
        });
    } catch (error) {
        res.status(500).json({success:false, error: error.message });
    }
};


exports.getAllElementsForMapping = async (req, res) => {
  try {
      const elements = await SubscriptionPlanElement.find();
      res.json({
          success:true,
          message:"Fetched Subscription Element Successfully",
          data:elements
      });
  } catch (error) {
      res.status(500).json({success:false, error: error.message });
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
  
      const element = await SubscriptionPlanElement.findByIdAndUpdate(
        req.params.id,
        { element_name },
        { new: true } // return the updated document
      );
  
      if (!element) {
        return res.status(404).json({ success: false, message: "Element not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Subscription Element Updated Successfully",
        data: element,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  

// Delete a subscription plan element
exports.deleteElement = async (req, res) => {
    try {
      const element = await SubscriptionPlanElement.findByIdAndDelete(req.params.id);
  
      if (!element) {
        return res.status(404).json({ success: false, message: "Element not found" });
      }
  
      res.json({
        success: true,
        message: "Element deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }

  };

  