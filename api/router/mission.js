const express = require("express");
const MissionController = require("../controller/MissionController");
const missionRouter = express.Router();
const authMiddleware = require("../middlewares/isLogged");

missionRouter.post(
  "/",
  authMiddleware.verifyToken,
  MissionController.createMission
);
missionRouter.get(
  "/today",
  authMiddleware.verifyToken,
  MissionController.getAllMissionsToday
);

module.exports = missionRouter;
