const express = require("express");
const userRouter = express.Router();
const UserController = require("../controller/UserController");

userRouter.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

userRouter.post("/", UserController.createUser);

module.exports = userRouter;
