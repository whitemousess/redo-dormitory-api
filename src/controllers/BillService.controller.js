const ContractModel = require("../models/Contract.model");
const RoomModel = require("../models/Room.model");

module.exports = {
  requestService(req, res, next) {
    ContractModel.findOne({ student_id: req.user.id, liquidation: 0 })
      .then((contract) =>
        RoomModel.findOneAndUpdate(
          { _id: contract.room_id },
          { $push: { Bill_service: req.body } },
          { new: true }
        ).then((room) => res.json(room))
      )
      .catch((err) => res.json(err));
  },

  async getAllService(req, res, next) {
    const data = await RoomModel.find({}).populate("Bill_service.service_id");
    const Bill = [];
    data.map((room) => {
      if (room.Bill_service && room.Bill_service.length > 0) {
        const bill = {
          bill_service: room.Bill_service.map((service) => ({
            service_id: service.service_id,
            phone: service.phone,
            status: service.status,
          })),
        };
        Bill.push(bill);
      }
    });
    res.json(Bill);
  },

  getRoomService(req, res, next) {
    ContractModel.findOne({ student_id: req.user.id, liquidation: 0 })
      .then((contract) =>
        RoomModel.findById(contract.room_id)
          .populate("Bill_service.service_id")
          .then((room) => res.json(room.Bill_service))
      )
      .catch((err) => res.json(err));
  },

  deleteRequestService(req, res, next) {
    const room_id = req.query.room_id;
    const service_id = req.query.service_id;

    RoomModel.findOneAndUpdate(
      { _id: room_id },
      { $pull: { Bill_service: { _id: service_id } } },
      { new: true }
    )
      .then((bill) => res.json(bill))
      .catch((err) => res.json(err));
  },
};
