const Score = require("../models/Score");
const User = require("../models/User");

// req = {"email": 'abc@gmail.com', 'userName': 'Tran Khanh Luong', "newScore": 100}
// when user finish a mission, we will call this function to update score
module.exports.updateUserScore = async (req, res) => {
    const response = await User.scan("email").eq(req.user.email).exec();
    const record = await Score.create({
      userId: req.body.userId,
      userName: req.body.userName,
      score: req.body.newScore
    })
    res.status(200).json({ message: "User info", data: response });
  }
  