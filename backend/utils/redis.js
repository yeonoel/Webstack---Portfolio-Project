import { promisify } from 'util';
import { createClient } from 'redis';

class RedisClient {
    
    constructor() {
        this.client = createClient();
        this.isClientConnected = true;
        this.client.on('error', (err) => {
            console.log('Redis client failed to connect:', err.message || err.toString());
            this.isClientConnected = false;
        });

        this.client.on('connect', () => {
            this.isClientConnected = true
        });
    }

    redisIsAlive() {
        this.isClientConnected;
    }

    async get(key) {
        return promisify(this.client.GET).bind(this.client)(key);
    }

    async set(key, value, duration) {
        await promisify(this.client.SET).bind(this.client)(key, duration, value);
    }

    async del(key) {
        await promisify(this.client.DEL).bind(this.client)(key);
      }
}

export const redisClient = new RedisClient();
export default redisClient;