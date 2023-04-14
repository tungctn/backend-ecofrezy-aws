const dynamoose = require("dynamoose");
const { v4: uuidv4 } = require("uuid");
const UserSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: uuidv4(),
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      default: "",
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      schema: [
        {
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
      ],
      default: [],
    },
    pickedMission: {
      type: Object,
      schema: {
        id: {
          type: String,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
      default: {},
    },
    todayMissions: {
      type: Object,
      schema: {
        missions: {
          type: Array,
        },
        updatedTime: {
          type: Date,
        },
      },
      default: {},
    },
    missionRequests: {
      type: Array,
      schema: [
        {
          type: Object,
          schema: {
            title: {
              type: String,
            },
            name: {
              type: String,
            },
            picturePath: {
              type: String,
            },
            friendId: {
              type: String,
            },
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = dynamoose.model("user", UserSchema);
