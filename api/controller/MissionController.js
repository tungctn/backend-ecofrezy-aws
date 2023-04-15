const Mission = require("../models/Mission");
const User = require("../models/User");

module.exports.createMission = async (req, res) => {
  try {
    await Mission.create({ ...req.body }, (err, mission) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ mission: mission });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllMissionsToday = async (req, res) => {
  try {
    const user = await User.scan("email").eq(req.user.email).exec();
    if (user[0].todayMissions.missions === 0) {
      const missions = await Mission.scan().exec();
      const randomMissions = [];
      while (randomMissions.length < 3) {
        const randomMission =
          missions[Math.floor(Math.random() * missions.length)];
        if (!randomMissions.includes(randomMission)) {
          randomMissions.push(randomMission);
        }
      }
      user[0].todayMissions.missions = randomMissions;
      await user[0].save();
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getMissionById = async (req, res) => {
  try {
    const { id } = req.params;
    await Mission.get(id, (err, mission) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ mission: mission });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.updateMissionById = async (req, res) => {
  try {
    const { id } = req.params;
    await Mission.update(id, { ...req.body }, (err, mission) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ mission: mission });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.deleteMissionById = async (req, res) => {
  try {
    const { id } = req.params;
    await Mission.delete(id, (err, mission) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ mission: mission });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
