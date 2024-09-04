import EventList from "@/components/event-list/event-list";
import { getAllEvents } from "@/data/dummy-data";

export default function AllEventsPage() {
  const events = getAllEvents();
  return (
    <div>
      <EventList items={events} />
    </div>
  );
}
