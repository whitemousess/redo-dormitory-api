const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    count_student: [
      { type: Schema.Types.ObjectId, ref: "Accounts", required: true },
    ],
    room_id: { type: Schema.Types.ObjectId, ref: "Rooms", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "Accounts", required: true },
    date_start: { type: String, required: true },
    date_end: { type: String, required: true },
    method_payment: { type: String, required: true },
    status: { type: Number, required: true, default: 0 },
    liquidation: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contracts", schema);
