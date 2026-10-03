import { MongoClient, Db } from "mongodb";
import dns from "dns";

// Ensure reliable SRV DNS resolution on Windows / varied local networks
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore in environments where setting DNS servers is restricted
}

const uri = process.env.MONGODB_URI;
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getMongoDb(): Promise<Db | null> {
  if (!uri) {
    return null;
  }

  try {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      });
      global._mongoClientPromise = client.connect();
    }
    const connectedClient = await global._mongoClientPromise;
    return connectedClient.db("kalasamanvaya");
  } catch (error) {
    console.warn("MongoDB connection warning (falling back to memory store):", error);
    return null;
  }
}
