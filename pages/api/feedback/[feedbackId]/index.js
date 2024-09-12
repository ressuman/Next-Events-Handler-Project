import { buildFeedbackPath, extractFeedback } from "..";

export default function handler(req, res) {
  const { feedbackId } = req.query;

  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);

  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );

  if (!selectedFeedback) {
    res.status(404).json({ message: "Feedback not found" });
    return;
  }

  res.status(200).json({
    feedback: selectedFeedback,
  });
}
