const { s3Uploadv3 } = require("../s3Service");

module.exports.upload = async (req, res, next) => {
  try {
    const result = await s3Uploadv3(req.file);

    return res.status(200).json({
      status: "success",
      result: result,
      url: result.Location,
    });
  } catch (err) {
    console.log(err);
  }
};
