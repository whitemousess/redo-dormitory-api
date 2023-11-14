const express = require("express");
const router = express.Router();

const ServiceController = require("../controllers/Service.controller");
const { verifyTokenAndAdmin,verifyToken } = require("../middleware/CheckLogin");

router.get(
  "/get-all-service",
  verifyToken,
  ServiceController.getAllService
);
router.get(
  "/:id/get-service",
  verifyTokenAndAdmin,
  ServiceController.getService
);
router.post(
  "/create-service",
  verifyTokenAndAdmin,
  ServiceController.createService
);

router.delete(
  "/:id/delete",
  verifyTokenAndAdmin,
  ServiceController.deleteService
);
router.put("/:id/edit", verifyTokenAndAdmin, ServiceController.editService);

module.exports = router;
