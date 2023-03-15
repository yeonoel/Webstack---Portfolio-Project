import mongodb from 'mongodb';

class DBclient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_Port || 5000;
        const database = process.env.DB_DATABASE || 'files_manager';

        const dbUrl = 'mongodb://${host}:${port}/datanase';
        this.client = new mongodb.MongoClient(dbUrl);
    }

    dbIsAlive() {
        return this.client.isConnected();
    }
  
    async usersCollections(){
        return this.client.db().collection('users');
    }

    async homesCollections() {
        return this.client.db().collection('Homes');
    }

}

export const dbClient = new DBclient();
export default dbClient;