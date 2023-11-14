const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/CheckLogin");
const BillController = require("../controllers/BillRoom.controller");

router.post(
  "/create-bill-room",
  verifyTokenAndAdmin,
  BillController.createBillRoom
);
router.get("/get-all-bill", verifyTokenAndAdmin, BillController.getAllBill);

router.get("/get-bill", verifyToken, BillController.getOneBill);
router.put("/:id/paid-bill", verifyToken, BillController.paidBill);
router.delete(
  "/:id/delete-bill",
  verifyTokenAndAdmin,
  BillController.deleteBill
);

module.exports = router;
