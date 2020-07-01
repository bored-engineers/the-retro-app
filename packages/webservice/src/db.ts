import MongoClient, { Db } from 'mongodb'
import config from 'config';

let db: Db = null;
const DB_URL = process.env.DB_URL || config.get('db.url');

var DbConnection = async function (): Promise<Db> {
    try {
        if (db != null) {
            console.log(`db connection is already alive`);
            return db;
        } else {
            console.log(`getting new db connection to ${DB_URL}`);
            db = await (await MongoClient.connect(DB_URL)).db();
            return db;
        }
    } catch (e) {
        return e;
    }
}

export default DbConnection;