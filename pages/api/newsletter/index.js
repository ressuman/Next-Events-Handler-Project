import { MongoClient } from "mongodb";

async function connectDatabase() {
  const url = process.env.MONGO_DB_URL;
  const client = new MongoClient(url);
  const dbName = "Events-Newsletter";

  try {
    await client.connect();
    return { client, dbName };
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to the database.");
  }
}

async function insertDocument(client, dbName, document) {
  try {
    const db = client.db(dbName);
    const collection = db.collection("emails");
    const insertResult = await collection.insertOne(document);
    return insertResult;
  } catch (error) {
    console.error("Document insertion error:", error);
    throw new Error("Failed to insert document.");
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    const newRegistration = { email };

    let client;
    try {
      const { client, dbName } = await connectDatabase(); // Database connection wrapped in try-catch
      const insertResult = await insertDocument(
        client,
        dbName,
        newRegistration
      ); // Document insertion wrapped in try-catch

      console.log("Inserted document:", insertResult);

      res.status(201).json({
        message: "Signed Up!",
        data: newRegistration,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: error.message });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
