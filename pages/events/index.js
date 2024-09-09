import EventList from "@/components/event-list/event-list";
import EventSearch from "@/components/event-search/event-search";
import { getAllEvents } from "@/helpers/utils/api-utils";

import { useRouter } from "next/router";

export default function AllEventsPage({ events }) {
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

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
