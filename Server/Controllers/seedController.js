// Modified seedController.js
const { default: axios } = require("axios");
const trasactionModel = require("../Model/transactionModel");

const getSeedingData = async () => {
  try {
    const count = await trasactionModel.countDocuments();

    if (count > 0) {
      console.log("Seeding already done!");
      return;
    }

    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    if (response.data) {
      await trasactionModel.insertMany(response.data);
      console.log("Seeding completed successfully!");
    } else {
      console.log("Data not found!");
    }
  } catch (error) {
    console.log("Seeding failed", error);
  }
};

module.exports = getSeedingData;
