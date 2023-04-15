const AWS = require("aws-sdk"),
      {
        CognitoIdentityProvider: CognitoIdentityServiceProvider
      } = require("@aws-sdk/client-cognito-identity-provider");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

AWS.config.update({
  region: "ap-southeast-1",
});

const cognito = new CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

exports.cognito = cognito;

const CLIENT_ID = process.env.CLIENT_ID;

exports.CLIENT_ID = CLIENT_ID;

module.exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  const params = {
    ClientId: "2pqp346d6o20e9vlfnmtcf64go",
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

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: "2pqp346d6o20e9vlfnmtcf64go",
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

module.exports.userInfo = async (req, res) => {
  const { accessToken } = req.body;

  const params = {
    AccessToken: accessToken,
  };

  cognito.getUser(params, async (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      //   res.status(200).json(data);
      const response = await User.get(data.Username);
      console.log(response);
      //   res.status(200).json({ message: "User info", data: response });
      if (response) {
        res.status(200).json({ message: "User info", data: response });
      } else {
        res.status(200).json({ message: "User info", data: data });
      }
    }
  });
};
