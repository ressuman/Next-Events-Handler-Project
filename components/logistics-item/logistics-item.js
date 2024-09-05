import styles from "./logistics-item.module.css";
import PropTypes from "prop-types";

export default function LogisticsItem({ children, icon: Icon }) {
  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span className={styles.content}>{children}</span>
    </li>
  );
}

LogisticsItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
};
