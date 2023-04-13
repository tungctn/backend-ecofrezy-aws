const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const appRouter = require("./router/index.js");
const dynamoose = require("dynamoose");

const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: "ap-southeast-1",
});

dynamoose.aws.ddb.set(ddb);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", appRouter);

module.exports = app;
