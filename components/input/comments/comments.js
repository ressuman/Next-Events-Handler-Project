import { useContext, useState, useEffect } from "react";

import styles from "./comments.module.css";
import NewComment from "../new-comment/new-comment";
import CommentList from "../comment-list/comment-list";
import NotificationContext from "@/store/notification-context";

export default function Comments({ eventId }) {
  const { showNotification } = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setComments(data.comments);
        })
        .catch((error) => console.log(error));
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    showNotification({
      title: "Sending comment...",
      message:
        "Your comment is currently being processed and stored in a database.",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
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
          message: "Your comment has been processed and saved",
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
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}
