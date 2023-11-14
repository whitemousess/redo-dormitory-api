const BillRoom = require("../models/BillRoom.model");
const ContractModel = require("../models/Contract.model");

module.exports = {
  createBillRoom(req, res, next) {
    const bill = new BillRoom(req.body);
    bill
      .save()
      .then((bill) => res.json({ data: bill }))
      .catch((err) => res.sendStatus(500));
  },

  getAllBill(req, res, next) {
    if (req.query.status) {
      BillRoom.find({ status: req.query.status })
        .populate(["room_id"])
        .then((bill) => res.json({ data: bill }))
        .catch((err) => res.sendStatus(500));
    } else {
      BillRoom.find()
        .populate(["room_id"])
        .then((bill) => res.json({ data: bill }))
        .catch((err) => res.sendStatus(500));
    }
  },

  getOneBill(req, res, next) {
    ContractModel.findOne({ student_id: req.user.id })
      .then((contract) =>
        BillRoom.findOne({ room_id: contract.room_id, status: 0 })
          .populate("room_id")
          .then((bill) => res.json({ data: bill }))
          .catch((err) => res.sendStatus(500))
      )
      .catch((err) => res.sendStatus(500));
  },

  paidBill(req, res, next) {
    BillRoom.updateMany(
      { room_id: req.params.id, status: 0 },
      { status: req.body.status }
    )
      .then((bill) => res.json({ data: bill }))
      .catch((err) => res.sendStatus(500));
  },

  deleteBill(req, res, next) {
    BillRoom.findOneAndDelete({ _id: req.params.id })
      .then((bill) => res.json({ data: bill }))
      .catch((err) => res.sendStatus(500));
  },
};
