const express = require('express');
const router = express.Router();
const {
  createPostByRequirement,
  getAllPostByRequirements,
  getPostByRequirementById,
  updatePostByRequirement,
  deletePostByRequirement
} = require('../controllers/postByRequirementController');

// POST
router.post('/create-post-by-requirement', createPostByRequirement);

// GET ALL
router.get('/fetch-all-post-requirement', getAllPostByRequirements);

// GET BY ID
router.get('/fetch-post-requirement-by-id/:id', getPostByRequirementById);

// PUT/UPDATE
router.put('/update-post-requirement/:id', updatePostByRequirement);

// DELETE
router.delete('/delete-post-requirement/:id', deletePostByRequirement);

module.exports = router;
