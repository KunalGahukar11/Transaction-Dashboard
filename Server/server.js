const express = require("express");
require("dotenv").config();

const dbConnection = require("./Config/db_config");
const transactionRouter = require("./Routes/transactionRoutes");
const getSeedingData = require("./Controllers/seedController");

const app = express();

app.use(express.json());

// routes
app.use("/api/transaction", transactionRouter);

dbConnection();

app.listen(8082, (err) => {
  if (!err) {
    console.log("Server is up and running!");
    getSeedingData();
  } else {
    console.log("Something went wrong", err);
  }
});
