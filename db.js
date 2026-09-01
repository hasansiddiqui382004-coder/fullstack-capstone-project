const { MongoClient } = require('mongodb');

// Connection URL and Database Name
const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = "giftlink";

let dbInstance = null;

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }

    const client = new MongoClient(url);

    try {
        // Required line for Task 4
        await client.connect();
        console.log("Connected successfully to MongoDB server");
        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
}

module.exports = { connectToDatabase };
