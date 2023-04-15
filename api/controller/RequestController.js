const Request = require("../models/Request");

module.exports.createRequest = async (req, res) => {
  try {
    const { requester, recipent } = req.body;

    const requestA = await Request.create({
      recipent: recipent,
      requester: requester,
    });

    const requestB = await Request.create({
      recipent: recipent,
      requester: requester,
    });

    requestA.refId = requestB.id;
    requestB.refId = requestA.id;
    requestA.save();
    requestB.save();

    return res.status(200).json({ requestA: requestA, requestB: requestB });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
