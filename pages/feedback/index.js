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

export async function getStaticProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}
