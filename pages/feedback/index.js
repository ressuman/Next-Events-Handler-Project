import { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

export default function FeedbackPage({ feedbackItems }) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    //fetch(`/api/${id}`)
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      {feedbackData && (
        <div>
          <h4>{feedbackData.email}</h4>
          <p>{feedbackData.text}</p>
        </div>
      )}
      <ul>
        {feedbackItems.map((feedbackItem) => (
          <li key={feedbackItem.id}>
            {feedbackItem.email} - {feedbackItem.text}{" "}
            <button onClick={loadFeedbackHandler.bind(null, feedbackItem.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
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
