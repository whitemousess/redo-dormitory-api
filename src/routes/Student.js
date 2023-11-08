const router = require("express").Router();

const StudentController = require("../controllers/Student.controller")

router.get("/get-students", StudentController.getStudentManager);

module.exports = router;
