import { promisify } from 'util';
import { createClient } from 'redis';

class RedisClient {
    
    constructor() {
        this.client = createClient();
        this.isClientConnected = true;

        (
            async() => {
                await this.client.connect();
            }
        )()
        
        this.client.on('error', (err) => {
            console.log('Redis client failed to connect:', err.message || err.toString());
            this.isClientConnected = false;
        });
         
        this.client.on('connect', () => {
            console.log('Redis is connected');
            this.isClientConnected = true
        });
    }

    redisIsAlive() {
        return this.isClientConnected;
    }

    async get(key) {
        return this.client.GET(key);
    }

    async set(key, value, duration) {
        this.client.SETEX(key, duration, value, (err, result) => {
          if (err) {
            console.error(err);
            throw err;
          }
          console.log(`Set ${key}=${value} with expiry ${duration} seconds in Redis.`);
        });
      }

    async del(key) {
        await this.client.DEL(key);
      }
}

export const redisClient = new RedisClient();
export default redisClient;