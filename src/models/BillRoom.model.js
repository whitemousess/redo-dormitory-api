const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    room_id: { type: Schema.Types.ObjectId, ref: "Rooms" },
    status: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BillRooms", schema);
