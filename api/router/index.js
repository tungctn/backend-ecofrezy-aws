const express = require("express");

const userRouter = require("./user");
const missionRouter = require("./mission");
const postRouter = require("./post");

const appRouter = express.Router();

appRouter.use("/user", userRouter);
appRouter.use("/mission", missionRouter);
appRouter.use("/post", postRouter);

module.exports = appRouter;
