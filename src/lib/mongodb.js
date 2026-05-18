import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_CONNECTION;

if (!uri) {
  throw new Error("Missing MONGODB_CONNECTION in environment variables");
}

const globalForMongo = globalThis;

const client =
  globalForMongo._mongoClient ?? new MongoClient(uri, { maxPoolSize: 10 });

if (!globalForMongo._mongoClient) {
  globalForMongo._mongoClient = client;
}

const dbName = process.env.MONGODB_DB_NAME || "mediqueue";
export const db = client.db(dbName);
export { client };
