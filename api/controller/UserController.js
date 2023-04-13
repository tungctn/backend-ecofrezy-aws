const User = require("../models/User");

module.exports.createUser = async (req, res) => {
  try {
    // const { id, name, email } = req.body;
    await User.create({ ...req.body }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ user: user });
    });
    // return res.status(200).json({ ...req.body });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
