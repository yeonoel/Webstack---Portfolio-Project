import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db.js';

export const xtokenAuthenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        console.log(userId)
        const user = await (await dbClient.usersCollections())
            .findOne({ _id: ObjectId(userId) });
        console.log(user)
        if (!user) {
            res.status(404).json({ error: 'Unautorized'});
            return;
        }
        req.user = user;
     next();
    } catch(error) {
        res.status(401).json({ error: "error auuthentication" });
    }
}

export default xtokenAuthenticate;