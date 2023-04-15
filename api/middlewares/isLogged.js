const User = require("../models/User");
const { cognito } = require("./cognito");

module.exports.verifyToken = async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.replace("Bearer ", "");
  if (!accessToken) {
    return res.status(403).json({ message: "No token provided" });
  }
  try {
    const params = {
      AccessToken: accessToken,
    };

    cognito.getUser(params, async (err, data) => {
      if (err) {
        res.status(400).json(err);
      } else {
        req.user = { email: data.Username };
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
