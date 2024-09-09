import ErrorAlert from "@/components/error-alert/error-alert";
import EventContent from "@/components/event-content/event-content";
import EventLogistics from "@/components/event-logistics/event-logistics";
import EventSummary from "@/components/event-summary/event-summary";
import { getAllEvents, getEventById } from "@/helpers/utils/api-utils";

export default function EventsDetailPage({ selectedEvent }) {
  const event = selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
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
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}
