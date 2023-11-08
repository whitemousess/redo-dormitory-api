const express = require("express");
const router = express.Router();

const { verifyToken, verifyTokenAndAdmin } = require("../middleware/CheckLogin");
const BillController = require("../controllers/BillService.controller");

router.get("/admin/get-service-request",verifyTokenAndAdmin, BillController.getAllService);
router.get("/user/get-service-request",verifyToken, BillController.getRoomService);

router.put("/request-bill", verifyToken, BillController.requestService);
router.put("/delete-bill",verifyTokenAndAdmin, BillController.deleteRequestService);

module.exports = router;
