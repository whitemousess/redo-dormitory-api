const router = require('express').Router();

const {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken} = require('../middleware/CheckLogin');
const ReportController = require("../controllers/Report.controller");

// create report
router.put('/create-report',verifyToken,ReportController.createReport);
// delete report
router.put('/:id/delete-report',verifyTokenAndAdmin,ReportController.deleteReport);
// success report
router.put("/:id/success-report",verifyTokenAndAdmin, ReportController.successReport);
// get report
router.get('/get-all-report',ReportController.getAllReport);

module.exports = router