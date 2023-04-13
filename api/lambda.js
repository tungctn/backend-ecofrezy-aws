// const serverlessExpress = require('@vendia/serverless-express')
const serverless = require("serverless-http");
const app = require("./app");

exports.handler = serverless(app);
