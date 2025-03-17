const express = require('express');
const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');
const studentValidation = require('../middleware/studentValidation');

const router = express.Router();

router.post('/create-students', studentValidation, createStudent);
router.get('/fetch-students', studentValidation, getStudents);
router.get('/fetch-students-by-id/:id', studentValidation, getStudentById);
router.put('/update-students-by-id/:id',studentValidation, updateStudent);
router.delete('/delete-students-by-id/:id', studentValidation, deleteStudent);

module.exports = router;
