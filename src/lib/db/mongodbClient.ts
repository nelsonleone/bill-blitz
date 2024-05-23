import { MongoClient, Db } from 'mongodb';
import { MONGO_DB_URI } from '$env/static/private'

const uri = MONGO_DB_URI;

if (!uri) {
 throw new Error("Invalid/Missing environment variable: 'MONGO_DB_URI'")
}


let client : MongoClient | null = null;
let db : Db | null;

export async function connectDB() {
  if (db) return db;

  try {
    client = await MongoClient.connect(uri)
    db = client.db()
    console.log('Connected to MongoDB')
    return db;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
    throw err;
  }
}

export async function getDB() {
  if (!db) {
    await connectDB()
  }
  return db;
}

export async function closeDB() {
  if (client) {
    await client.close()
    client = null;
    db = null;
    console.log('Disconnected from MongoDB')
  }
}
