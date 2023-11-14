const RoomModel = require("../models/Room.model");
const ContractModel = require("../models/Contract.model");

module.exports = {
  getManagerRoom(req, res, next) {
    RoomModel.find()
      .populate(["user_id", "count_student.student_id"])
      .then((rooms) => res.json({ data: rooms }))
      .catch((err) => res.json({ error: err }));
  },

  getRoomStudent(req, res, next) {
    ContractModel.findOne({ student_id: req.user.id, liquidation: 0 })
      .then((rooms) => {
        if (!rooms) {
          res.json({ message: "No room yet" });
        } else {
          RoomModel.findById(rooms.room_id)
            .populate("count_student.student_id")
            .then((rooms) => res.json(rooms.count_student))
            .catch((err) => res.json({ error: err }));
        }
      })
      .catch((err) => res.json({ error: err }));
  },

  getRoomById(req, res, next) {
    RoomModel.findOne({ _id: req.params.id })
      .populate(["user_id"])
      .then((rooms) => res.json({ data: rooms }))
      .catch((err) => res.json({ error: err }));
  },

  createRoom(req, res, next) {
    const room = new RoomModel(req.body);
    room
      .save()
      .then((room) => res.json({ data: room }))
      .catch((err) => res.json({ error: err }));
  },

  editRoom(req, res, next) {
    RoomModel.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((room) => res.json({ data: room }))
      .catch((err) => res.json({ error: err }));
  },

  deleteRoom(req, res, next) {
    RoomModel.findOneAndDelete({ _id: req.params.id })
      .then((room) => res.json({ data: room }))
      .catch((err) => res.json({ error: err }));
  },
};
