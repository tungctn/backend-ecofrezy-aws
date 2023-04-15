const Score = require("../models/Score");
const User = require("../models/User");
const redis = require("redis");
const Redis = require('redis');
const cfenv = require('cfenv');

//function to get the leaderboard 
//return the leaderboard of the user's friends 

module.exports.getLeaderBoard = async (req, res) => {
    // req = {'friends': ['userId1', 'userId2', 'userId3']}
    // Get the user's friends id
    const userIds = req.body.friends;
    // Retrieve table of the score from the redis cache
    // create a Redis client
    const client = redis.createClient({
        host: 'your_redis_host',
        port: 'your_redis_port',
    });
    let idNotInCache = [];
    // check the set of keys in the redis cache contains the userIds 
    client.smembers("userIdPool", async function (err, userIdPool) {
        // if the user's friends is all in the score table, we will return the leaderboard of the user's friends
        for (let i = 0; i < userIds.length; i++) {
                if (!userIdPool.includes(userIds[i])) {
                    // Get the score table where the userId in userIds
                    const response = await Score.in(userIds).exec();
                    res.status(200).json({ message: "Leaderboard", data: response });
        }
    }});
    // retrieve the leaderboard from the redis cache with the key in the userIds
    client.mget(userIds, async function (err, result) {
        res.status(200).json({ message: "Leaderboard", data: result });
    });    

}