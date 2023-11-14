const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    user_id: { type: Number, default: 20000 },
    username: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    gender: { type: Number, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    reports: [
      {
        _id: false,
        report_id: {
          type: Schema.Types.ObjectId,
          ref: "reports",
        },
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
