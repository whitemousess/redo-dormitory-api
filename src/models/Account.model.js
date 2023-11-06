const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    user_id: { type: Number, unique: true, default: 20000 },
    username: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    gender: { type: Number, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    report: [
      {
        title: { type: String},
        description: { type: String},
        status: { type: Number, default: 0 },
      },
    ],
    dob: { type: String, required: true },
    avatarUrl: { type: String },
    role: { type: Boolean, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("accounts", schema);
