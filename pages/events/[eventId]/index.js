import EventContent from "@/components/event-detail/event-content/event-content";
import EventLogistics from "@/components/event-detail/event-logistics/event-logistics";
import EventSummary from "@/components/event-detail/event-summary/event-summary";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "@/helpers/utils/api-utils";
import Head from "next/head";

export default function EventsDetailPage({ selectedEvent }) {
  const event = selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>All Events-{event.title}</title>
        <meta name="description" content={event.description} />
        <link rel="icon" type="image/svg" href="/icon.svg" />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export async function getStaticProps({ params }) {
  //const eventId = ctx.params.eventId;
  const { eventId } = params;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  //const events = await getAllEvents();
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths: paths,
    //fallback: false,
    //fallback: true,
    fallback: "blocking",
  };
}
