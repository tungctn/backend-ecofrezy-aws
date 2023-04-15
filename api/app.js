const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const appRouter = require("./router/index.js");
const dynamoose = require("dynamoose");
const multer = require("multer");

const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: "ap-southeast-1",
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


app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "File limit reached",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an image",
      });
    }
  }
});

module.exports = app;
