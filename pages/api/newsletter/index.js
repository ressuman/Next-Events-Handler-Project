import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    const newRegistration = {
      email,
    };

    const url = process.env.MONGO_DB_URL;
    const client = new MongoClient(url);
    const dbName = "Events-Newsletter";

    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection("emails");

      const insertResults = await collection.insertOne(newRegistration);
      console.log("Inserted document:", insertResults);

      res.status(201).json({
        message: "Signed Up!",
        data: newRegistration,
      });
    } catch (error) {
      console.error("Database insertion error:", error);
      res.status(500).json({ message: "Failed to sign up" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
