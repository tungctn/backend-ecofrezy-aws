const dynamoose = require("dynamoose");
const { v4: uuidv4 } = require("uuid");
const MissionSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: uuidv4(),
    },
    name: {
      type: String,
      required: true,
    },
    point: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      // enum: [""],
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = dynamoose.model("mission", MissionSchema);
