const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
      required: true,
    },
    room_id: { type: Schema.Types.ObjectId, ref: "Rooms", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "accounts", required: true },
    date_start: { type: String, required: true },
    date_end: { type: String, required: true },
    status: { type: Number, required: true, default: 0 },
    liquidation: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contracts", schema);
