import mongodb from 'mongodb';


class DBclient {
    constructor() {
        const host = process.env.DB_HOST || '127.0.0.1';
        const port = process.env.DB_Port || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        this.isClientConnecte = false;
        const dbUrl = `mongodb://${host}:${port}/${database}`;
        this.client = new mongodb.MongoClient(dbUrl, { useUnifiedTopology: true });
        this.asyncFunction = async () => {
            await this.client.connect();
            if (this.client.topology.isConnected()) {
                this.isClientConnecte = true;
            
            }
        }

        this.asyncFunction();
    }

    dbIsAlive() {
        return this.isClientConnecte;
    }
  
    async usersCollections() {
        return this.client.db().collection('users');
    }

    async homesCollections() {
        return this.client.db().collection('Homes');
    }

    async nbUsers() {
        return this.client.db().collection('users').countDocuments();
    }

    async nbHome() {
        return this.client.db().collection('Homes').countDocuments();
    }

}

export const dbClient = new DBclient();
export default dbClient;