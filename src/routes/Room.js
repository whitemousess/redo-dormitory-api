const express = require("express");
const router = express.Router();

const RoomController = require("../controllers/Room.controller");

router.get("/get-manager-room", RoomController.getManagerRoom)
router.get("/:id/get-room", RoomController.getRoomById);

router.post("/create-room", RoomController.createRoom);
router.put("/:id/edit-room", RoomController.editRoom);
router.delete("/:id/delete-room", RoomController.deleteRoom);

module.exports = router;
