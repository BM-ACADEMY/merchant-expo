const express = require('express');
const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-students', authMiddleware, createStudent);
router.get('/fetch-students', authMiddleware, getStudents);
router.get('/fetch-students-by-id/:id', authMiddleware, getStudentById);
router.put('/update-students-by-id/:id', authMiddleware, updateStudent);
router.delete('/delete-students-by-id/:id', authMiddleware, deleteStudent);

module.exports = router;
