import redisClient from "../utils/redis.js";
import dbClient from "../utils/db.js";

export default class AppController {
    static getStatus(req, res) {
        res.status(200).json({
            redis: redisClient.redisIsAlive(),
            db: dbClient.dbIsAlive(),
        });
    }

    static getStats(req, res) {
        Promise.all([dbClient.nbUsers(), dbClient.nbHome()])
            .then(([usersCount, homeCount]) => {
                res.status(200).json({ users: usersCount, homes: homeCount})
            });
    }
}