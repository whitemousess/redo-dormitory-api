const mongoose = require("mongoose");

// connect database in Mongo
async function connect() {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/dormitory"
    );
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failure");
  }
}

module.exports = { connect };
