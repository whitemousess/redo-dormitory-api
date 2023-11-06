const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    service_name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    status: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Services", schema);
