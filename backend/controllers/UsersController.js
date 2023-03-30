import sha1 from 'sha1';
import DBclient, { dbClient } from '../utils/db.js';




export default class UsersController {
    static async createAccount(req, res){
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

        const user = await (await DBclient.usersCollections()).findOne({ email });

        if (user) {
            res.status(400).json({error: 'Alredy exist'});
            return;
        }

        const insertionUser = await (await DBclient.usersCollections()).insertOne({ 
            email, password: sha1(password)
         });

         const userId = insertionUser.insertedId.toString();

         res.status(201).json({email, id: userId});
    }

    static async getMe(req, res) {
        const { user } = req;

        res.status(200).json({ email: user.email, id: user._id.toString()})

    }


    static async putAccount(req, res) {
        const id = req.params ? id : null;

        const userFilter = {
            _id: new mongoDBCore.DBSON.ObjecId(id),
        }
        const user = await (await dbClient.usersCollections()).
            findOne(userFilter);

        if (!user) {
            res.status(404).json({ error : 'Not found'});
            return;
        }

        await (await dbClient.homesCollections())
            .updateOne(userFilter, { ...req.body, _id: req.params.id});
        
        res.status(200).json({
            id,
            email: user.email,
            password: user.password,
         });
    }

    static async delAccount(req, res) {
        
        const { id } = req.params;

        const userFilter = {
            _id: new mongoDBCore.DBSON.ObjecId(id),
        }

        const user = await (await dbClient.usersCollections()).
            findOne(userFilter);
        
        if (!user) {
            res.status(400).json({ error: 'Not found'});
            return;
        }
        await (await dbClient.usersCollections())
            .deleteOne(userFilter);
        
        res.status(200).json({
            message: 'Delete user'
        })
    }
}