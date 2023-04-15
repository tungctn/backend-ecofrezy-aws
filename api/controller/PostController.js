const Post = require("../models/Post");
const User = require("../models/User");

module.exports.createPost = async (req, res) => {
  try {
    await Post.create({ ...req.body }, (err, post) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ post: post });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllPosts = async (req, res) => {
  try {
    const user = await User.scan("email").eq(req.user.email).exec();
    const friends = user[0]?.friends;
    const friendIds = friends.map((friend) => friend.id);
    let posts = await Post.scan()
      .where("userId")
      .in([...friendIds, user[0].id])
      .exec();
    return res.status(200).json({ posts: posts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
