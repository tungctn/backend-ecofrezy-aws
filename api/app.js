const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const appRouter = require("./router/index.js");
const dynamoose = require("dynamoose");
const multer = require("multer");
const { s3Uploadv2, s3Uploadv3 } = require("./s3Service");

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

// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[0] === "image") {
//     cb(null, true);
//   } else {
//     cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
//   }
// };

// // ["image", "jpeg"]

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 1000000000, files: 2 },
// });

// appRouter.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     const result = await s3Uploadv3(req.file);
//     console.log(result);
//     return res
//       .status(200)
//       .json({ status: "success", result: result, url: result.Location });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     const result = await s3Uploadv3(req.file);
//     console.log(result);
//     return res
//       .status(200)
//       .json({ status: "success", result: result, url: result.Location });
//   } catch (err) {
//     console.log(err);
//   }
// });

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
