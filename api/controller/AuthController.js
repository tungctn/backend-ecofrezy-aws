const { cognito, CLIENT_ID } = require("../middlewares/cognito");
const User = require("../models/User");

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  cognito.initiateAuth(params, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json({
        message: "User logged in successfully",
        email: email,
        accessToken: data.AuthenticationResult.AccessToken,
      });
    }
  });
};



module.exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  const params = {
    ClientId: CLIENT_ID,
    Password: password,
    Username: email,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  cognito.signUp(params, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

module.exports.confirm = async (req, res) => {
  const { email, confirmationCode } = req.body;

  const params = {
    ClientId: CLIENT_ID,
    ConfirmationCode: confirmationCode,
    Username: email,
  };

  cognito.confirmSignUp(params, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json({ message: "User confirmed successfully" });
    }
  });
};
