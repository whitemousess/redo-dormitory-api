const router = require("express").Router();

const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middleware/CheckLogin");
const ReportController = require("../controllers/Report.controller");

// create report
router.put("/create-report", verifyToken, ReportController.createReport);
// delete report
router.get(
  "/:id/delete-report",
  verifyTokenAndAdmin,
  ReportController.deleteReport
);
// success report
router.get(
  "/:id/success-report",
  verifyTokenAndAdmin,
  ReportController.successReport
);
// get report
router.get(
  "/get-all-report",
  verifyTokenAndAdmin,
  ReportController.getAllReport
);
router.get(
  "/get-student-report",
  verifyToken,
  ReportController.getReportInStudent
);

module.exports = router;
