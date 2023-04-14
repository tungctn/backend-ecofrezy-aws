const dynamoose = require("dynamoose");
const { v4: uuidv4 } = require("uuid");

const PostSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: uuidv4(),
  },
  missionName: {
    type: String,
    required: true,
  },
  picturePath: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPicturePath: {
    type: String,
    required: true,
  },
  likes: {
    type: Object,
    schema: {
      sum: {
        type: Number,
        default: 0,
      },
      users: {
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
      },
    },
  },
  comments: {
    type: Object,
    schema: {
      sum: {
        type: Number,
        default: 0,
      },
      users: {
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
              content: {
                type: String,
              },
            },
          },
        ],
      },
    },
  },
});

module.exports = dynamoose.model("post", PostSchema);
