import dbClient from "../utils/db.js";
import { ObjectId } from "mongodb";

export default class HomesController {
    static async postNewHome(req, res) {
        const { user } = req;
        console.log(req.file);
        console.log(req.body);

        // const thingObject = JSON.parse(req.body)
        const image = req.file ? req.file : null;

        const contry = req.body ? req.body.contry : null;
        const adress = req.body ? req.body.adress : null;
        const price = req.body ? req.body.price : null;



        if (!contry) {
            res.status(400).json({ error: 'Missing contry'});
            return;
        }
        if (!adress) {
            res.status(400).json({ error: 'Missing adress'});
            return;
        }
        if (!price) {
            res.status(400).json({ error: 'Missing price'});
            return;
        }
        if (!image) {
            res.status(400).json({ error: 'Missing cover'});
            return;
        }

        const userId = user._id.toString();

        const newHome = {
            userId: ObjectId(userId),
            contry,
            adress,
            price,
            file: `${req.protocol}://${req.get('host')}/images/${req.file.filename} `,
         }

        console.log(newHome);

        const insertionInfo = await (await dbClient.homesCollections())
            .insertOne(newHome);
        
        const fieldId = insertionInfo.insertedId.toString();

        
        console.log(fieldId)
        res.status(201).json({
            id: fieldId,
            userId: ObjectId(userId),
            contry,
            adress,
            price,
            file: `${req.protocol}://${req.get('host')}/images/${req.file.filename} `,
        })
    }

    static async getAllHomes(req, res) {
        const datas = await (await dbClient.homesCollections()).find().toArray();
        console.log(datas);
        res.status(200).json(datas);
    }

    static async getOneHome(req, res) {
        const id = req.params.id;
        
        const homeId = ObjectId(id);
        console.log(homeId)
        const datas = await (await dbClient.homesCollections()).find({ _id: homeId }).toArray();
        console.log(datas)
        res.status(200).json(datas[0]);

    }

    static async getMyResidences(req, res) {
        console.log(req.params)
        const usId = req.params.usId;
        console.log(usId)
        const homeId = ObjectId(usId);
        console.log(homeId)
        const datas = await (await dbClient.homesCollections()).find({ userId: homeId }).toArray();
        console.log(datas);
        res.status(200).json(datas);
    }



    static async putHome(req, res) {
        const id = req.params ? req.params.id : null;

        if (!id) {
            res.status(400).json({ error: 'Missing informations for update'});
            return;
        }
        const homeFilter = await (await dbClient.homesCollections())
            .findOne({ _id: new mongoDBCore.BSON.ObjectId(id), });
        
        if (!homeFilter) {
            res.status(404).json({ error : 'Not found'});
            return;
        }
        
        await (await dbClient.homesCollections())
            .updateOne(homeFilter, { ...req.body, _id: new mongoDBCore.BSON.ObjectId(id)});
        
        res.status(200).json({
            id,
            contry: homeFilter.contry,
            adress: homeFilter.adress,
            price: homeFilter.price,
            cover: homeFilter.cover,
        })
    }

    static async delHome(req, res) {
        const id = req.params ? req.params.id : null;

        console.log('-----------------------' + id)
        const usId = req.user._id
        const homeFilter = await (await dbClient.homesCollections())
            .findOne({ _id: ObjectId(id), userId: usId });

        console.log('-----------------------' + homeFilter)
        
        if (!homeFilter) {
            res.status(404).json({ error : 'Not found'});
            return;
        }

        await (await dbClient.homesCollections())
            .deleteOne(homeFilter);
        
        res.status(200).json({
            message: 'Delete residence'
        })

    }

    
}