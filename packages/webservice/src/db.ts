import MongoClient, { Db } from 'mongodb';
import config from 'config';

let db: Db = null;
const DB_URL = process.env.DB_URL || config.get('db.url');

var DbConnection = async function () {
  try {
    if (db != null) {
      return db;
    } else {
      console.log(`Getting new db connection to ${DB_URL}`);
      db = await (await MongoClient.connect(DB_URL)).db();
      return db;
    }
  } catch (e) {
    return e;
  }
};

export default DbConnection;
