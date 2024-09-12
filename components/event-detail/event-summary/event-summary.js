import styles from "./event-summary.module.css";
import PropTypes from "prop-types";

export default function EventSummary({ title }) {
  return (
    <section className={styles.summary}>
      <h1>{title}</h1>
    </section>
  );
}

EventSummary.propTypes = {
  title: PropTypes.string.isRequired,
};
