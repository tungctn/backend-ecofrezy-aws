const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports.createUser = async (req, res) => {
  try {
    const { name, email, password, picturePath } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      picturePath: picturePath,
    });

    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
