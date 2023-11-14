const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    room_id: { type: Schema.Types.ObjectId, ref: "Rooms" },
    service_id: { type: Schema.Types.ObjectId, ref: "Services" },
    status: { type: Number, default: 0 },
    phone: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("billServices", schema);
