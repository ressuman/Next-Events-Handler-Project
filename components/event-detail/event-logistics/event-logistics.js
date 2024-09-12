import styles from "./event-logistics.module.css";
import PropTypes from "prop-types";
import Image from "next/image";
import LogisticsItem from "../logistics-item/logistics-item";
import DateIcon from "@/components/icons/date-icon";
import AddressIcon from "@/components/icons/address-icon";

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
        <Image
          src={`/${image}`}
          alt={imageAlt}
          width={400}
          height={400}
          priority
        />
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
