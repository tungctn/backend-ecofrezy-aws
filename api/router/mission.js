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
missionRouter.get(
  "/pick/:id",
  authMiddleware.verifyToken,
  MissionController.pickMission
);
missionRouter.get(
  "/completed",
  authMiddleware.verifyToken,
  MissionController.completeMission
);

module.exports = missionRouter;
