const express = require("express");
const userRouter = express.Router();
const UserController = require("../controller/UserController");

userRouter.post("/", UserController.createUser);

module.exports = userRouter;
