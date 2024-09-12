import { buildFeedbackPath, extractFeedback } from "../api/feedback";

export default function FeedbackPage({ feedbackItems }) {
  return (
    <ul>
      {feedbackItems.map((feedbackItem) => (
        <li key={feedbackItem.id}>
          {feedbackItem.email} - {feedbackItem.text}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}
