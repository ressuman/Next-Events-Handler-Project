import { MongoClient } from "mongodb";

// export default async function handler(req, res) {
//   const { eventId } = req.query;

//   const url = process.env.MONGO_DB_URL;
//   const client = new MongoClient(url);
//   const dbName = "Events-Comments";

//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("comments");

//   if (req.method === "POST") {
//     const { email, name, text } = req.body;

//     if (
//       !email ||
//       email.trim() === "" ||
//       !email.includes("@") ||
//       !name ||
//       name.trim() === "" ||
//       !text ||
//       text.trim() === ""
//     ) {
//       res.status(422).json({
//         message: "Invalid input",
//       });
//       return;
//     }

//     const newComment = {
//       eventId,
//       email,
//       name,
//       text,
//       date: new Date(),
//     };

//     res.status(201).json({
//       message: "Comment added.",
//       comment: newComment,
//     });
//   }

//   if (req.method === "GET") {
//     const dummyList = [
//       {
//         id: "c1",
//         name: "Rich",
//         text: "This is just for practice",
//       },
//       {
//         id: "c2",
//         name: "Bella",
//         text: "This is just for more practice",
//       },
//       {
//         id: "c1",
//         name: "Nate",
//         text: "This is the 3rd practice",
//       },
//     ];

//     res.status(200).json({
//       message: "Retrieved all comments",
//       comments: dummyList,
//     });
//   }
// }

export default async function handler(req, res) {
  const { eventId } = req.query;

  const url = process.env.MONGO_DB_URL;
  const client = new MongoClient(url);
  const dbName = "Events-Comments";

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("comments");

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
        const result = await collection.insertOne(newComment);

        newComment.id = result.insertedId;

        res.status(201).json({
          message: "Comment added.",
          comment: newComment,
        });
      } catch (error) {
        res.status(500).json({ message: "Failed to add comment" });
      }
    } else if (req.method === "GET") {
      try {
        const comments = await collection
          .find({ eventId })
          .sort({ _id: -1 })
          .toArray();

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
    await client.close();
  }
}
