const express = require("express");
const userRouter = express.Router();
const UserController = require("../controller/UserController");
const ImageController = require("../controller/ImageController");
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuid } = require("uuid");
const formidable = require("formidable");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100000000, files: 1 },
});

const s3Uploadv3 = async (file) => {
  const s3client = new S3Client();

  const param = {
    Bucket: "ecofrenzy-images",
    Key: `user/${uuid()}-${file.originalname}`,
    Body: file.buffer,
    ACL: "public-read",
    ContentType: file.mimetype,
    // region: "ap-southeast-1",
  };

  await s3client.send(new PutObjectCommand(param));

  return {
    Key: param.Key,
    Location: `https://${param.Bucket}.s3.amazonaws.com/${param.Key}`,
  };
};

userRouter.post(
  "/upload",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const result = await s3Uploadv3(req.file);
      console.log(result);
      // req.picturePath = result.Location;
      // next();

      return res.status(200).json({
        status: "success",
        result: result,
        url: result.Location,
        req: req.body,
      });
    } catch (err) {
      console.log(err);
    }
  }
  // UserController.createUser
);
// userRouter.post(
//   "/",
//   upload.single("file"),
//   (req, res, next) => {
//     try {
//       const form = formidable({ multiples: true });
//       form.parse(req, (err, fields, files) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Lỗi khi xử lý yêu cầu");
//           // return;
//         }

//         const name = fields.name;
//         const email = fields.email;
//         const password = fields.password;

//         // Xử lý các giá trị ở đây

//         s3Uploadv3(req.file).then((result) => {
//           console.log(result);
//           return res.status(200).json({
//             status: "success",
//             result: result,
//             url: result.Location,
//             body: {
//               name: name,
//               email: email,
//               password: password,
//             },
//           });
//         });
//         // req.picturePath = result.Location;
//         // next();
//         // return res.status(200).json({
//         //   status: "success",
//         //   result: result,
//         //   url: result.Location,
//         //   body: {
//         //     name: name,
//         //     email: email,
//         //     password: password,
//         //   },
//         // });
//       });
//     } catch (err) {
//       console.log(err.message);
//     }
//   }
//   // UserController.createUser
// );

// userRouter.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     const result = await s3Uploadv3(req.file);
//     console.log(result);
//     req.picturePath = result.Location;
//     // next();
//     return res
//       .status(200)
//       .json({ status: "success", result: result, url: result.Location });
//   } catch (err) {
//     console.log(err);
//   }
// });
userRouter.post("/", UserController.createUser);

module.exports = userRouter;
