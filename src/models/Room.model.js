const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    room_name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    max_number: { type: Number, required: true, default: 1 },
    user_id: { type: Schema.Types.ObjectId, ref: "accounts", required: true },
    status: { type: Number, required: true, default: 0 },
    area: { type: Number, required: true },
    count_student: [
      {
        student_id: {
          type: Schema.Types.ObjectId,
          ref: "accounts",
          required: true,
        },
      },
    ],
    Bill_service: [
      {
        service_id: {
          type: Schema.Types.ObjectId,
          ref: "Services",
          required: true,
        },
        status: { type: Number, required: true, default: 0 },
      },
    ],
    Bill_Electric_Water: [
      {
        e_first: { type: Number, default: 0 },
        e_last: { type: Number, default: 0 },
        price_per_e: { type: Number, default: 0 },
        w_first: { type: Number, default: 0 },
        w_last: { type: Number, default: 0 },
        price_per_w: { type: Number, default: 0 },
        date_start: { type: String },
        date_end: { type: String },
        method_payment: { type: String, default: "pending" },
        status: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rooms", schema);
