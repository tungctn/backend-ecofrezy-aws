const Mission = require("../models/Mission");

module.exports.createMission = async (req, res) => {
  try {
    // const { id, name, email } = req.body;
    await Mission.create({ ...req.body }, (err, mission) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ mission: mission });
    });
    // return res.status(200).json({ ...req.body });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllMissions = async (req, res) => {
  try {
    await Mission.scan().exec((err, missions) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ missions: missions });
    });
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
