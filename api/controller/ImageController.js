// const { s3Uploadv3 } = require("../utils/S3Service");

const { S3Client } = require("@aws-sdk/client-s3");

const s3Uploadv3 = async (file) => {
  const s3client = new S3Client();

  const param = {
    Bucket: "ecofrenzy-images",
    Key: `${folder}/${uuid()}-${file.originalname}`,
    Body: file.buffer,
    ACL: "public-read",
    ContentType: file.mimetype,
  };

  await s3client.send(new PutObjectCommand(param));

  return {
    Key: param.Key,
    Location: `https://${param.Bucket}.s3.amazonaws.com/${param.Key}`,
  };
};

module.exports.upload = async (req, res) => {
  try {
    const image = await s3Uploadv3(req.file, "user");
    return res.status(200).json({ image: image.Location });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
