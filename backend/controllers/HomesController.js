import dbClient from "../utils/db";

export default class FileController {
    static async postNewHome(req, res) {
        const { user } = req;
        const contry = req.body ? req.body.contry : null;
        const adress = req.body ? req.body.adress : null;
        const price = req.body ? req.body.price : null;
        const cover = req.body ? req.body.cover : null;

        
        if (!contry) {
            res.status(400).json({ error: 'Missing contry'});
        }
        if (!adress) {
            res.status(400).json({ error: 'Missing adress'});
        }
        if (!price) {
            res.status(400).json({ error: 'Missing price'});
        }
        if (!cover) {
            res.status(400).json({ error: 'Missing cover'});
        }

        const userId = user._id.toString();

        const newHome = {
            userId: new mongoDBCore.BSON.ObjectId(userId),
            contry,
            adress,
            price,
            cover,
        }

        const insertionInfo = await (await dbClient.homesCollections())
            .insertOne({ newHome });
        
        const fieldId = insertionInfo.insertedId.toString();

        res.status(201).json({
            id: fieldId,
            userId,
            contry,
            adress,
            price,
            cover,
        })
    }

    static async getAllHomes(req, res) {
        const allHome = (await dbClient.homesCollections()).find();
        res.status(200).json(allHome);
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

        const homeFilter = await (await dbClient.homesCollections())
            .findOne({ _id: new mongoDBCore.BSON.ObjectId(id), });
        
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