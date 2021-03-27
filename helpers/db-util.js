import { MongoClient } from "mongodb";

export async function connectionDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://nihadk:260689nk@cluster0.fwqsr.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDoucment(client, collection, documents) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(documents);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}
