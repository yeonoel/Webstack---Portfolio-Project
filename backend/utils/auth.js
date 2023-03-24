import dbClient from '../utils/db';
import redisClient from './redis';

export const getUserFromAuthorization = async (req) => {
    const Authorization = req.headers.authorization || null;

    if (!Authorization) {
        return;
    }

    const authorizationParams = Authorization.split(' ');

    if (authorizationParams.length !== 2 || authorizationParams[0] !== 'Basic' ) {
        return null;
    }

    const token = Buffer(authorizationParams[1], 'base64').toString();

    const [email, password] = token.split(':');

    const user = await (await dbClient.usersCollections()).findOne({ email });

    if (!user || sh1(password) !== user.password) {
        return null;
    }

    return user;
}

export const getUserfromXtoken = async (req) => {
    const token = req.headers['x-token'];

    if (!token) {
        return null;
    }

    const userId =  await redisClient.get(`auth_${token}`);

    if (!userId) {
        return null;
    }

    const user = await (await dbClient.usersCollections())
        .findOne({ _id: new mongoDBCore.BSON.ObjectId(userId) });

    return user || null;
}


export default {
    getUserFromAuthorization: async (req) => getUserFromAuthorization(req),
    getUserfromXtoken: async (req) => getUserfromXtoken(req),
};