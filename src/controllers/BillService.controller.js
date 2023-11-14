const ContractModel = require("../models/Contract.model");
const RoomModel = require("../models/Room.model");
const BillServiceModel = require("../models/BillService.model");

module.exports = {
  requestService(req, res, next) {
    ContractModel.findOne({ student_id: req.user.id, liquidation: 0 })
      .then((contract) => {
        req.body.room_id = contract.room_id;
        const BillService = new BillServiceModel(req.body);
        BillService.save().then((bill) => {
          RoomModel.findOneAndUpdate(
            { _id: contract.room_id },
            { $push: { Bill_service: { id: bill._id } } },
            { new: true }
          ).then((room) => res.json(room));
        });
      })
      .catch((err) => res.json(err));
  },

  getAllService(req, res, next) {
    BillServiceModel.find()
      .populate(["room_id", "service_id"])
      .then((bill) => res.json(bill))
      .catch((err) => res.json(err));
  },

  getRoomService(req, res, next) {
    ContractModel.findOne({ student_id: req.user.id, liquidation: 0 })
      .then((contract) =>
        BillServiceModel.find({ room_id: contract.room_id ,status: 0})
          .populate(["room_id", "service_id"])
          .then((room) => res.json(room))
      )
      .catch((err) => res.sendStatus(500));
  },

  successBill(req, res, next) {
    const room_id = req.query.room_id;
    const service_id = req.query.service_id;

    if (!service_id) {
      BillServiceModel.updateMany(
        { room_id: room_id },
        {
          $set: { status: 1 },
        }
      )
        .then((bill) => res.json(bill))
        .catch((err) => res.sendStatus(500));
    } else {
      BillServiceModel.findOneAndUpdate(
        { _id: service_id },
        { status: 1 }
      ).then((bill) => res.json(bill));
    }
  },

  deleteRequestService(req, res, next) {
    const service_id = req.query.service_id;

    BillServiceModel.findByIdAndDelete(service_id)
      .then((bill) => {
        RoomModel.findOneAndUpdate(
          { _id: bill.room_id },
          { $pull: { Bill_service: { id: bill._id } } },
          { new: true }
        )
          .then((bill) => res.json(bill))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  },
};
