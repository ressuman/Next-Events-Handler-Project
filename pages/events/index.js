import EventList from "@/components/event-list/event-list";
import EventSearch from "@/components/event-search/event-search";
import { getAllEvents } from "@/data/dummy-data";
import { useRouter } from "next/router";

export default function AllEventsPage() {
  const events = getAllEvents();

  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}
