const dynamoose = require("dynamoose");
const { v4: uuidv4 } = require("uuid");
const RequestSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: uuidv4(),
    },
    recipent: {
      type: Object,
      schema: {
        id: {
          type: String,
        },
        name: {
          type: String,
        },
        picturePath: {
          type: String,
        },
      },
    },
    requester: {
      type: Object,
      schema: {
        id: {
          type: String,
        },
        name: {
          type: String,
        },
        picturePath: {
          type: String,
        },
      },
    },
    status: {
      type: Number,
      enum: [1, 2],
    },
    refId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = dynamoose.model("request", RequestSchema);
