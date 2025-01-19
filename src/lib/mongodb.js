import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb://root:kh4YFOlqIv846vt2U6DKGD0e@everest.liara.cloud:30619/my-app?authSource=admin"
);

let db;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db();
  }
  return db;
}

export { connectToDatabase };
