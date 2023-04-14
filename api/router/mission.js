const express = require("express");
const MissionController = require("../controller/MissionController");
const missionRouter = express.Router();

missionRouter.post("/", MissionController.createMission);
missionRouter.get("/", MissionController.getAllMissions);

module.exports = missionRouter;
