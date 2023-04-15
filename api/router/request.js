const express = require("express");
const requestRouter = express.Router();
const RequestController = require("../controller/RequestController");
const authMiddleware = require("../middlewares/isLogged");

requestRouter.post(
  "/",
  authMiddleware.verifyToken,
  RequestController.createRequest
);

module.exports = requestRouter;
