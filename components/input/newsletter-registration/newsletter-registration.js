import styles from "./newsletter-registration.module.css";
import { useRef, useState } from "react";

export default function NewsletterRegistration() {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@")
    ) {
      setIsInvalid(true);
      return;
    }

    const reqBody = {
      email: enteredEmail,
    };

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // setFeedbackData(data.feedback);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
