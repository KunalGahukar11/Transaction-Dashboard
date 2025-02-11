const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to DB!");
  } catch (error) {
    console.log("Something went wrong while reaching to DB", error);
  }
};

module.exports = dbConnection;
