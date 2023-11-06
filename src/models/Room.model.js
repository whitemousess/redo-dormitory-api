const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    room_name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    max_number: { type: Number, required: true, default: 1 },
    user_id: { type: Schema.Types.ObjectId, ref: "Accounts", required: true },
    status: { type: Number, required: true, default: 0 },
    area: { type: Number, required: true },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rooms", schema);
