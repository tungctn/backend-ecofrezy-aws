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
    role: {
      type: Number,
      enum: [1, 2],
      default: 2,
    },
    // password: {
    //   type: String,
    //   required: true,
    //   default: "",
    // },
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
        isDone: {
          type: Boolean,
          default: false,
        },
      },
      default: {},
    },
    todayMissions: {
      type: Object,
      schema: {
        missions: {
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
                category: {
                  type: String,
                },
                description: {
                  type: String,
                },
                isDone: {
                  type: Boolean,
                  default: false,
                },
              },
            },
          ],
          // default: [],
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
            // username
            name: {
              type: String,
            },
            picturePath: {
              type: String,
            },
            friendId: {
              type: String,
            },
            userPicturePath: {
              type: String,
            },
          },
        },
      ],
      default: [],
    },
    score: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

module.exports = dynamoose.model("user", UserSchema);
