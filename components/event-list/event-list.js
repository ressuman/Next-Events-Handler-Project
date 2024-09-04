import EventItem from "../event-item/event-item";
import styles from "./event-list.module.css";

export default function EventList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <EventItem
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          date={item.date}
          location={item.location}
        />
      ))}
    </ul>
  );
}
