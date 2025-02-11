const transactionModel = require("../Model/transactionModel");
const moment = require("moment");

// get all products
const getAllTransactions = async (req, res) => {
  try {
    const { page } = req.query;
    const pageNumber = page ? parseInt(page) : 1;

    const totalRecords = await transactionModel.countDocuments();

    const transactions = await transactionModel
      .find()
      .skip((pageNumber - 1) * 10)
      .limit(10);

    if (!transactions) {
      return res
        .status(404)
        .json({ success: false, message: "Transactions not found!" });
    }

    res.status(201).json({
      success: true,
      message: "Transactions",
      data: transactions,
      total: totalRecords,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get product by id
const getTransactionById = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    const transaction = await transactionModel.findOne({ id: id });

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found!" });
    }

    res
      .status(201)
      .json({ success: true, message: "Transaction", data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get search result
const getSearchQuery = async (req, res) => {
  try {
    let { value, month } = req.query;

    if (!value && !month) {
      return res.status(400).json({ success: false, message: "Invalid query" });
    }

    const searchQuery = { $or: [] };

    // Check if value is a number (for price search)
    let isNumber = parseFloat(value);
    if (!isNaN(isNumber)) {
      searchQuery.$or.push({ price: isNumber });
    } else if (value) {
      searchQuery.$or.push(
        { title: { $regex: value, $options: "i" } },
        { description: { $regex: value, $options: "i" } }
      );
    }

    // Month mapping (CamelCase to Month Number)
    const monthMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };

    if (month) {
      const monthNumber = monthMap[month];

      if (!monthNumber) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid month name" });
      }

      searchQuery.$expr = { $eq: [{ $month: "$dateOfSale" }, monthNumber] };
    }

    const result = await transactionModel.find(searchQuery).limit(10);

    if (!result.length) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found!" });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getAllTransactions, getTransactionById, getSearchQuery };
