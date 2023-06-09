const Mission = require("../models/Mission");
const User = require("../models/User");

module.exports.createMission = async (req, res) => {
  try {
    const { name, description, category, point } = req.body;
    let categoryName;
    if (category === 1) {
      categoryName = "Energy and Resources";
    } else if (category === 2) {
      categoryName = "FTransportation";
    } else if (category === 3) {
      categoryName = "Consumption";
    } else if (category === 4) {
      categoryName = "Waste management";
    } else {
      categoryName = "Awareness and Innovation";
    }
    await Mission.create(
      {
        name: name,
        description: description,
        point: point,
        category: categoryName,
      },
      (err, mission) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ mission: mission });
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllMissionsToday = async (req, res) => {
  try {
    const user = await User.scan("email").eq(req.user.email).exec();
    if (user[0].todayMissions.missions.length === 0) {
      let missions = await Mission.scan().exec();
      missions = missions.map((mission) => {
        return {
          id: mission.id,
          name: mission.name,
          description: mission.description,
          category: mission.category,
          point: mission.point,
          isDone: false,
        };
      });
      const randomMissions = [];
      while (randomMissions.length < 3) {
        const randomMission =
          missions[Math.floor(Math.random() * missions.length)];
        if (!randomMissions.includes(randomMission)) {
          randomMissions.push(randomMission);
        }
      }
      User.update(
        { id: user[0].id },
        { todayMissions: { missions: randomMissions } }
      );
      return res.status(200).json({ missions: randomMissions });
    } else {
      return res.status(200).json({ missions: user[0].todayMissions.missions });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.pickMission = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.scan("email").eq(req.user.email).exec();
    let mission = await Mission.get(id);
    if (user[0].pickedMission?.isDone) {
      mission = {
        id: mission.id,
        title: mission.name,
        description: mission.description,
        isDone: false,
      };
      await User.update({ id: user[0].id }, { pickedMission: mission });
      return res.status(200).json({ mission: mission });
    } else {
      return res
        .status(400)
        .json({ message: "You don't complete the mission" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.completeMission = async (req, res) => {
  try {
    const user = await User.scan("email").eq(req.user.email).exec();
    await User.update({ id: user[0].id }, { pickedMission: {} });
    const user1 = await User.scan("email").eq(req.user.email).exec();
    user1[0].todayMissions.missions.forEach((mission) => {
      if (mission.id === user1[0].pickedMission.id) {
        mission.isDone = true;
      }
    });
    await User.update(
      { id: user1[0].id },
      { todayMissions: user1[0].todayMissions }
    );
    res.status(200).json({ user: user1[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
