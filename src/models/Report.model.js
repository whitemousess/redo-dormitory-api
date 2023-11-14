const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "accounts" },
    title: { type: String },
    description: { type: String },
    status: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("reports", schema);
