import styles from "./event-logistics.module.css";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import LogisticsItem from "../logistics-item/logistics-item";
import PropTypes from "prop-types";

export default function EventLogistics({ date, address, image, imageAlt }) {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const addressText = address.replace(", ", "\n");

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <img src={`/${image}`} alt={imageAlt} />
      </div>
      <ul className={styles.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

EventLogistics.propTypes = {
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};
