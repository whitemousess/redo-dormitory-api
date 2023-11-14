const BillEWModel = require("../models/BillEW.model");
const RoomModel = require("../models/Room.model");
const ContractModel = require("../models/Contract.model");

module.exports = {
  createBill(req, res, next) {
    req.body.room_id = req.params.id;
    const bill = new BillEWModel(req.body);
    bill
      .save()
      .then((bill) => {
        RoomModel.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { Bill_Electric_Water: { electric_water_id: bill._id } } },
          { new: true }
        )
          .then((room) => res.status(200).json(bill))
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.json(err));
  },

  getAllElectric(req, res, next) {
    BillEWModel.find()
      .populate("room_id")
      .then((bill) => {
        res.json({ data: bill });
      })
      .catch((err) => console.log(err));
  },

  getElectricRoom(req, res, next) {
    ContractModel.findOne({ student_id: req.user.id, liquidation: 0 })
      .then((bill) =>
        RoomModel.findById(bill.room_id)
          .populate(["Bill_Electric_Water.electric_water_id"])
          .then((room) => res.json({ data: room.Bill_Electric_Water[0] }))
      )
      .catch((err) => res.json({ data: err }));
  },

  getOneElectric(req, res, next) {
    const bill_id = req.params.id;

    BillEWModel.findOne({ _id: bill_id, status: 0 })
      .then((bill) => res.json({ data: bill }))
      .catch((err) => res.json({ data: err }));
  },

  deleteBill(req, res, next) {
    const bill_id = req.query.bill_id;

    BillEWModel.findByIdAndDelete(bill_id, { new: true })
      .then((bill) => {
        RoomModel.findOneAndUpdate(
          { _id: bill.room_id },
          { $pull: { Bill_Electric_Water: { electric_water_id: bill._id } } }
        )
          .then((room) => res.json({ data: bill }))
          .catch((err) => res.json({ err: err }));
      })
      .catch((err) => res.json(err));
  },

  editBill(req, res, next) {
    const bill_id = req.query.bill_id;

    BillEWModel.findOneAndUpdate(
      {
        _id: bill_id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((bill) => {
        if (req.body.status === 1) {
          RoomModel.findOneAndUpdate(
            { _id: bill.room_id },
            { $pull: { Bill_Electric_Water: { electric_water_id: bill._id } } }
          )
            .then((room) => res.json({ data: bill }))
            .catch((err) => res.json({ err: err }));
        }
      })
      .catch((error) => {
        res.json({ error: error });
      });
  },
};
