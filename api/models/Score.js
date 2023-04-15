const dynamoose = require("dynamoose");
const { v4: uuidv4 } = require("uuid");
const ScoreSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: uuidv4(),
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = dynamoose.model("score", ScoreSchema);
