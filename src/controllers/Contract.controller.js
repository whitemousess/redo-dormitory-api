const ContractModel = require("../models/Contract.model");
const RoomModel = require("../models/Room.model");

module.exports = {
  getContract(req, res, next) {
    ContractModel.find({ liquidation: 0 })
      .populate(["student_id", "room_id", "user_id"])
      .then((contract) => res.json(contract))
      .catch((err) => res.json(err));
  },

  getContractStudent(req, res, next) {
    ContractModel.findOne({ student_id: req.user.id })
      .populate(["student_id", "room_id", "user_id"])
      .then((contract) => res.json({ data: contract }))
      .catch((err) => res.json(err));
  },

  getLiquidation(req, res, next) {
    ContractModel.find({ liquidation: 1 })
      .populate(["student_id", "room_id", "user_id"])
      .then((contractLiq) => {
        res.json({ data: contractLiq });
      })
      .catch((err) => res.json(err));
  },

  deleteContract(req, res, next) {
    ContractModel.findOneAndDelete({ _id: req.params.id }, { new: true })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },

  createContract(req, res, next) {
    req.body.user_id = req.user.id;
    const contract = new ContractModel(req.body);
    contract
      .save()
      .then((contract) => {
        RoomModel.findOneAndUpdate(
          { _id: req.body.room_id },
          { $push: { count_student: req.body } }
        ).then(res.json({ data: contract }));
      })
      .catch((err) => res.json(err));
  },

  liquidationContract(req, res, next) {
    req.body.liquidation = 1;
    ContractModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((result) =>
        RoomModel.findOneAndUpdate(
          { _id: result.room_id },
          {
            $pull: {
              count_student: { student_id: result.student_id },
            },
          }
        ).then(res.json({ data: result }))
      )
      .catch((err) => res.json({ message: err }));
  },
};
