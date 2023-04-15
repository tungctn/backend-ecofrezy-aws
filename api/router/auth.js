const express = require("express");
const authRouter = express.Router();
const AuthController = require("../controller/AuthController");
const authMiddleware = require("../middlewares/isLogged");

authRouter.post("/login", AuthController.login);

module.exports = authRouter;
