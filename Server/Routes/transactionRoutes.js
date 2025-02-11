const express = require("express");
const {
  getAllTransactions,
  getTransactionById,
  getSearchQuery,
} = require("../Controllers/transactionController");

const transactionRouter = express.Router();

// to get all products
transactionRouter.get("/get-all-transactions", getAllTransactions);

// get product by id
transactionRouter.get("/get-transaction/:id", getTransactionById);

// get serach result
transactionRouter.get("/get-search-query", getSearchQuery);

module.exports = transactionRouter;
