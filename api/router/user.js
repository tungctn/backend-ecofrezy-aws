const express = require("express");
const userRouter = express.Router();
const UserController = require("../controller/UserController");
const ImageController = require("../controller/ImageController");
const { upload } = require("../s3Service");
const authMiddleware = require("../middlewares/isLogged");

userRouter.post(
  "/upload",
  authMiddleware.verifyToken,
  upload.single("file"),
  ImageController.upload
);

userRouter.post("/", UserController.createUser);
userRouter.get("/profile", authMiddleware.verifyToken, UserController.userInfo);
//userRouter.put("/finish", )
module.exports = userRouter;
