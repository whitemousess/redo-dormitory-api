const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/CheckLogin");
const BillEWController = require("../controllers/BillEW.controller");

router.get(
  "/get-all-electric",
  verifyTokenAndAdmin,
  BillEWController.getAllElectric
);
router.get("/get-electric-room", verifyToken, BillEWController.getElectricRoom);
router.get(
  "/:id/get-electric",
  verifyTokenAndAdmin,
  BillEWController.getOneElectric
);

router.put(
  "/:id/create-bill",
  verifyTokenAndAdmin,
  BillEWController.createBill
);

router.get("/delete-bill", verifyTokenAndAdmin, BillEWController.deleteBill);
router.put("/edit-bill", verifyToken, BillEWController.editBill);

module.exports = router;
