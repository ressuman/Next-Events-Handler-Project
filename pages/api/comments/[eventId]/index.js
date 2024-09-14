import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "@/helpers/utils/db-utils";

export default async function handler(req, res) {
  const { eventId } = req.query;

  let client;

  try {
    const dbConfig = await connectDatabase("Events-Comments");
    client = dbConfig.client;

    if (req.method === "POST") {
      const { email, name, text } = req.body;

      if (
        !email ||
        email.trim() === "" ||
        !email.includes("@") ||
        !name ||
        name.trim() === "" ||
        !text ||
        text.trim() === ""
      ) {
        res.status(422).json({ message: "Invalid input" });
        client.close();
        return;
      }

      const newComment = {
        eventId,
        email,
        name,
        text,
        date: new Date(),
      };

      try {
        const insertResult = await insertDocument(
          client,
          dbConfig.dbName,
          "comments",
          newComment
        );

        newComment._id = insertResult.insertedId;

        res.status(201).json({
          message: "Comment added.",
          comment: newComment,
        });
      } catch (error) {
        res.status(500).json({ message: "Failed to add comment" });
      }
    } else if (req.method === "GET") {
      try {
        const comments = await getAllDocuments(
          client,
          dbConfig.dbName,
          "comments",
          { eventId },
          { date: -1 }
        );

        res.status(200).json({
          message: "Retrieved all comments",
          comments,
        });
      } catch (error) {
        res.status(500).json({ message: "Failed to retrieve comments" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
