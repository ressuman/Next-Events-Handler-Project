import { connectDatabase, insertDocument } from "@/helpers/utils/db-utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    const newRegistration = { email };
    let client;

    try {
      const { client, dbName } = await connectDatabase();
      const insertResult = await insertDocument(
        client,
        dbName,
        newRegistration
      );

      res.status(201).json({
        message: "Signed Up!",
        data: newRegistration,
      });
    } catch (error) {
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
