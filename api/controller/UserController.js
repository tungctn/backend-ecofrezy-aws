const User = require("../models/User");

module.exports.createUser = async (req, res) => {
  try {
    const { name, email, picturePath } = req.body;

    const user = await User.create({
      name: name,
      email: email,
      picturePath: picturePath,
    });

    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.userInfo = async (req, res) => {
  const response = await User.scan("email").eq(req.user.email).exec();
  res.status(200).json({ message: "User info", data: response });
}; 

