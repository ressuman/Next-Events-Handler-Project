import NotificationContext from "@/store/notification-context";
import styles from "./newsletter-registration.module.css";
import { useRef, useState, useContext } from "react";

export default function NewsletterRegistration() {
  const { showNotification } = useContext(NotificationContext);

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

    showNotification({
      title: "Signing Up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        showNotification({
          title: "Success",
          message: "Registered successfully for newsletter.",
          status: "success",
        });
      })
      .catch((error) => {
        showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
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
