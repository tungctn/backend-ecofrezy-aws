const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const appRouter = require("./router/index.js");
const dynamoose = require("dynamoose");

const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: "ap-southeast-1",
  //   accessKeyId: "AKIATL7YZBSBUR52CYVO",
  //   secretAccessKey: "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",
});

dynamoose.aws.ddb.set(ddb);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", appRouter);

appRouter.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

module.exports = app;
