import MongoClient, {Db} from 'mongodb'
import config from 'config';

let db:Db = null;

var DbConnection = async function () {
    try {
        if (db != null) {
            console.log(`db connection is already alive`);
            return db;
        } else {
            console.log(`getting new db connection`);
            db = await (await MongoClient.connect(config.get('db.url'))).db();
            return db;
        }
    } catch (e) {
        return e;
    }
}

export default DbConnection;