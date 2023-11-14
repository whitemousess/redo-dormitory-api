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
        _id: false,
        student_id: {
          type: Schema.Types.ObjectId,
          ref: "accounts",
        },
      },
    ],
    Bill_service: [
      {
        _id: false,
        id: {
          type: Schema.Types.ObjectId,
          ref: "billServices",
          required: true,
        },
      },
    ],
    Bill_Electric_Water: [
      {
        _id: false,
        electric_water_id: {
          type: Schema.Types.ObjectId,
          ref: "BillEWs",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rooms", schema);
