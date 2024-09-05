import styles from "./error-alert.module.css";
import PropTypes from "prop-types";

export default function ErrorAlert({ children }) {
  return <div className={styles.alert}>{children}</div>;
}

ErrorAlert.propTypes = {
  children: PropTypes.node.isRequired,
};
