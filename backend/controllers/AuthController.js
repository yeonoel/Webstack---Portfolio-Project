import redisClient from '../utils/redis.js'
import dbClient from '../utils/db.js';
import sha1 from 'sha1';
import jwt from 'jsonwebtoken';

export default class AuthController {
    static async login(req, res) {
      const email = req.body ? req.body.email : null;
      const password = req.body ? req.body.password : null;

        if(!email) {
            res.status(400).json({error: 'Missing email'})
            return;
        }

        if (!password) {
            res.status(400).json({error: 'Missing password'})
            return;
        }

      const user = await (await dbClient.usersCollections()).findOne({ email });
      if (!user || sha1(password) !== user.password) {
        return null;
      }
      const token = jwt.sign(
        {userId: user._id},
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24H'}
        
      );

      const key = `${token}`;
      const duration = 24 * 60 * 60;
      console.log(`------------------------------------> ${user._id}`)

      await redisClient.set(key, user._id.toString(), duration);
      console.log(`------------------------------------> ${user._id}`)
      res.status(200).json({
        userId: user._id,
         token
         });
    } 

    static async getDisconnect(req) {
        const token = req.headers['x-token'];

        await redisClient.del(`auth_${token}`);
        res.status(204).send();
    }
}