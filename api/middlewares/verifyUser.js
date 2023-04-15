const User = require("../models/User");
const authMiddleware = require("./isLogged");

module.exports.verifyUser = async (role) => {
  return async (req, res, next) => {
    authMiddleware.verifyToken(req, res, async () => {
      const { email } = req.user;
      const user = await User.scan({ email: { eq: email } }).exec();
      if (role.includes(user.role)) {
        next();
      } else {
        return res.status(403).json({ message: "Unauthorized" });
      }
    });
  };
};
