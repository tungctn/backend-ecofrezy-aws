const express = require("express");
const PostController = require("../controller/PostController");
const postRouter = express.Router();
const authMiddleware = require("../middlewares/isLogged");

postRouter.post("/", authMiddleware.verifyToken, PostController.createPost);
postRouter.get("/", authMiddleware.verifyToken, PostController.getAllPosts);

module.exports = postRouter;
