const dynamoose = require("dynamoose");
const { v4: uuidv4 } = require("uuid");
const MissionSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: uuidv4(),
    },
    title: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    description: {
      type: String,
      default: "",
    },  
  },
  { timestamps: true }
);

module.exports = dynamoose.model("mission", MissionSchema);
