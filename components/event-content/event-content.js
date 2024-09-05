import styles from "./event-content.module.css";
import PropTypes from "prop-types";

export default function EventContent({ children }) {
  return <section className={styles.content}>{children}</section>;
}

EventContent.propTypes = {
  children: PropTypes.node.isRequired,
};
