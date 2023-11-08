const express = require("express");
const router = express.Router();

const RoomController = require("../controllers/Room.controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/CheckLogin");

router.get(
  "/get-manager-room",
  verifyTokenAndAdmin,
  RoomController.getManagerRoom
);
router.get("/get-student-room", verifyToken, RoomController.getRoomStudent);
router.get("/:id/get-room", verifyTokenAndAdmin, RoomController.getRoomById);

router.post("/create-room", verifyTokenAndAdmin, RoomController.createRoom);
router.put("/:id/edit-room", verifyTokenAndAdmin, RoomController.editRoom);
router.delete(
  "/:id/delete-room",
  verifyTokenAndAdmin,
  RoomController.deleteRoom
);

module.exports = router;
