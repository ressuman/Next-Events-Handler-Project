import EventList from "@/components/events/event-list/event-list";
import EventSearch from "@/components/events/event-search/event-search";
import { getAllEvents } from "@/helpers/utils/api-utils";
import Head from "next/head";

import { useRouter } from "next/router";

export default function AllEventsPage({ events }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>Ressuman-All Events</title>
        <meta name="description" content="Find all events we cater for" />
        <link rel="icon" type="image/svg" href="/icon.svg" />
      </Head>
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
