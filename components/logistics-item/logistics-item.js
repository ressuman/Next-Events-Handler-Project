import styles from "./logistics-item.module.css";

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
