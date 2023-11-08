const RoomModel = require("../models/Room.model");
const ContractModel = require("../models/Contract.model");

module.exports = {
  createBill(req, res, next) {
    RoomModel.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { Bill_Electric_Water: req.body } },
      { new: true }
    )
      .then((bill) => res.status(200).json(bill))
      .catch((err) => res.status(500).json(err));
  },

  async getAllElectric(req, res, next) {
    const data = await RoomModel.find({});
    const bills = [];

    data.forEach((room) => {
      const billEW = room.Bill_Electric_Water;

      if (billEW && billEW.length > 0) {
        const billRoom = {
          bill_electric_water: billEW.map((bill) => ({
            id: bill._id,
            room_name: room.room_name,
            room_id: room._id,
            e_first: bill.e_first,
            e_last: bill.e_last,
            price_per_e: bill.price_per_e,
            w_first: bill.w_first,
            w_last: bill.w_last,
            price_per_w: bill.price_per_w,
            date_start: bill.date_start,
            date_end: bill.date_end,
            status: bill.status,
          })),
        };

        bills.push(billRoom);
      }
    });

    res.json({ data: bills });
  },

  getElectricRoom(req, res, next) {
    ContractModel.findOne({ student_id: req.user.id, liquidation: 0 })
      .then((bill) =>
        RoomModel.findById(bill.room_id).then((room) =>
          res.json({ data: room })
        )
      )
      .catch((err) => res.json({ data: err }));
  },

  getOneElectric(req, res, next) {
    const room_id = req.query.room_id;
    const bill_id = req.query.bill_id;

    RoomModel.findOne({
      _id: room_id,
    }).then((room) => {
      const findBill = room.Bill_Electric_Water.find(
        (bill) => bill._id == bill_id
      );
      res.json({ data: findBill });
    });
  },

  deleteBill(req, res, next) {
    const room_id = req.query.room_id;
    const bill_id = req.query.bill_id;

    RoomModel.findOneAndUpdate(
      { _id: room_id },
      {
        $pull: { Bill_Electric_Water: { _id: bill_id } },
      },
      { new: true }
    )
      .then((bill) => {
        if (!bill) {
          return res.status(404).json({ error: "Không tồn tại bill" });
        }
        res.json({ data: bill });
      })
      .catch((error) => {
        res.json({ error: error });
      });
  },

  editBill(req, res, next) {
    const room_id = req.query.room_id;
    const bill_id = req.query.bill_id;

    RoomModel.findOneAndUpdate(
      {
        _id: room_id,
        "Bill_Electric_Water._id": bill_id,
      },
      {
        $set: {
          "Bill_Electric_Water.$.e_first": req.body.e_first,
          "Bill_Electric_Water.$.e_last": req.body.e_last,
          "Bill_Electric_Water.$.price_per_e": req.body.price_per_e,
          "Bill_Electric_Water.$.w_first": req.body.w_first,
          "Bill_Electric_Water.$.w_last": req.body.w_last,
          "Bill_Electric_Water.$.price_per_w": req.body.price_per_w,
          "Bill_Electric_Water.$.date_start": req.body.date_start,
          "Bill_Electric_Water.$.date_end": req.body.date_end,
          "Bill_Electric_Water.$.status": req.body.status,
        },
      },
      { new: true }
    )
      .then((report) => {
        res.json({ data: report });
      })
      .catch((error) => {
        res.json({ error: error });
      });
  },
};
