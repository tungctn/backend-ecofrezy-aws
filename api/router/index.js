const express = require("express");

const userRouter = require("./user");
const missionRouter = require("./mission");
const postRouter = require("./post");
const authRouter = require("./auth");
const requestRouter = require("./request");

const appRouter = express.Router();

appRouter.use("/user", userRouter);
appRouter.use("/mission", missionRouter);
appRouter.use("/post", postRouter);
appRouter.use("/auth", authRouter);
appRouter.use("/request", requestRouter);

module.exports = appRouter;
