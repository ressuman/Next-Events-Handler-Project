export default function handler(req, res) {
  const { eventId } = req.query;

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
      res.status(422).json({
        message: "Invalid input",
      });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newComment);

    res.status(201).json({
      message: "Comment added.",
      comment: newComment,
    });
  }

  if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        name: "Rich",
        text: "This is just for practice",
      },
      {
        id: "c2",
        name: "Bella",
        text: "This is just for more practice",
      },
      {
        id: "c1",
        name: "Nate",
        text: "This is the 3rd practice",
      },
    ];

    res.status(200).json({
      message: "Retrieved all comments",
      comments: dummyList,
    });
  }
}
