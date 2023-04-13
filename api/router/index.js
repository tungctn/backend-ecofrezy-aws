const express = require("express");
const UserRouter = require("./user");
const appRouter = express.Router();

appRouter.use("/user", UserRouter);

module.exports = appRouter;
