import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" name="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            cols="30"
            rows="10"
            name="feedback"
            ref={feedbackInputRef}
          ></textarea>
        </div>
        <button type="submit">Send Feedback</button>
      </form>
      <hr />
      <button type="send" onClick={loadFeedbackHandler}>
        Load Feedback
      </button>
      <ul>
        {feedbackItems.map((feedbackItem) => (
          <li key={feedbackItem.id}>
            {feedbackItem.email} - {feedbackItem.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
