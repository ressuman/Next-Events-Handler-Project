import Link from "next/link";
import styles from "./button.module.css";
import PropTypes from "prop-types";

export default function Button({ children, link, onClick }) {
  if (link) {
    return (
      <Link href={link} className={styles.btn}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={styles.btn}>
      {children}
    </button>
  );
}

Button.propTypes = {
  link: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
