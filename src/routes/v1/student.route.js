const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const studentValidation = require('../../validations/student.validation');
const studentController = require('../../controllers/student.controller');

const router = express.Router();

router
.route('/')
.post(validate(studentValidation.createStudent), studentController.createStudent)
.get(validate(studentValidation.getStudents), studentController.getStudents);

router
.route('/:studentId')
.get(validate(studentValidation.getStudent), studentController.getStudent)
.patch(validate(studentValidation.updateStudent), studentController.updateStudent)
.delete(validate(studentValidation.deleteStudent), studentController.deleteStudent);

module.exports = router;