const express = require('express');
const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint
} = require('../controllers/complaintFormController');

const router = express.Router();

// Make sure all routes have a `/` before the path
router.post('/create-complaint', createComplaint); // Create
router.get('/fetch-all-complaint', getAllComplaints); // Get All
router.get('/fetch-complaint-by-id/:id', getComplaintById); // Get One
router.put('/update-complaint/:id', updateComplaint); // Update
router.delete('/delete-complaint/:id', deleteComplaint); // Delete

module.exports = router;
