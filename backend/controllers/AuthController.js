import redisClient from '../utils/redis'
import { v4 as uuidv4} from 'uuid';

export default class AuthController {
    static async getConnect(res, req) {
      const { user } =  req;

      const token = uuidv4();
      const key = `auth_${token}`;

      await redisClient.set(key, user._id.toString(), 24 * 60 * 60);
      res.status(200).json({ token });
    }

    static async getDisconnect(req) {
        const token = req.headers['x-token'];

        await redisClient.del(`auth_${token}`);
        res.status(204).send();
    }
}