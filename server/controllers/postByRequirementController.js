const PostByRequirement = require('../models/postByRequirementModel');

// CREATE
const createPostByRequirement = async (req, res) => {
  try {
    const {
      product_or_service,
      quantity,
      unit_of_measurement,
      phone_number,
      user_id,
      supplier_preference,
      selected_states
    } = req.body;

    // Validate required fields
    if (!product_or_service || !quantity || !unit_of_measurement || !phone_number || !user_id || !supplier_preference) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    // Supplier preference specific validation
    if (supplier_preference === 'Specific States') {
      if (!Array.isArray(selected_states) || selected_states.length === 0) {
        return res.status(400).json({ error: 'Selected states are required when supplier preference is "Specific States".' });
      }
    }

    // Create new post
    const newPost = new PostByRequirement({
      product_or_service,
      quantity,
      unit_of_measurement,
      phone_number,
      user_id,
      supplier_preference,
      selected_states: supplier_preference === 'Specific States' ? selected_states : []
    });

    const savedPost = await newPost.save();
    res.status(201).json({
      success:true,
      message:"Requirement Added Successfully",
      data:savedPost
    });
  } catch (error) {
    res.status(500).json({success:false, error: error.message });
  }
};

// GET ALL
const getAllPostByRequirements = async (req, res) => {
  try {
    const posts = await PostByRequirement.find().populate('user_id');
    res.status(200).json({
      success:true,
      message:"Fetched Requirement Successfully",
      data :posts
    });
  } catch (error) {
    res.status(500).json({success:false, error: error.message });
  }
};

// GET ONE
const getPostByRequirementById = async (req, res) => {
  try {
    const post = await PostByRequirement.findById(req.params.id).populate('user_id');
    if (!post) {
      return res.status(404).json({ message: 'Requirement not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
const updatePostByRequirement = async (req, res) => {
  try {
    const updatedPost = await PostByRequirement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Requirement not found' });
    }
    res.status(200).json({
      
      success:true,
      message:"Requirement Updated Successfully",
      data :updatedPost
    });
  } catch (error) {
    res.status(400).json({success:false, error: error.message });
  }
};

// DELETE
const deletePostByRequirement = async (req, res) => {
  try {
    const deletedPost = await PostByRequirement.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Requirement not found' });
    }
    res.status(200).json({success:true, message: 'Requirement deleted successfully' });
  } catch (error) {
    res.status(500).json({success:false, error: error.message });
  }
};

module.exports = {
  createPostByRequirement,
  getAllPostByRequirements,
  getPostByRequirementById,
  updatePostByRequirement,
  deletePostByRequirement
};
