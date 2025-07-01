import { MongoClient } from "mongodb";

let client;
let db;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    const uri = import.meta.env.MONGODB_URI;
    const dbName = import.meta.env.MONGODB_DB;

    if (!uri || !dbName) {
      throw new Error(
        "MongoDB URI o nombre de base de datos no configurados en .env"
      );
    }

    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);

    console.log("✅ Conectado a MongoDB:", dbName);
    return db;
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    throw error;
  }
}

export async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

// Helper para obtener la colección de artículos
export async function getArticlesCollection() {
  const database = await connectToDatabase();
  return database.collection("articles");
}
