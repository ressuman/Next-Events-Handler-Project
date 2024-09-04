import ErrorAlert from "@/components/error-alert/error-alert";
import EventContent from "@/components/event-content/event-content";
import EventLogistics from "@/components/event-logistics/event-logistics";
import EventSummary from "@/components/event-summary/event-summary";
import { getEventById } from "@/data/dummy-data";
import { useRouter } from "next/router";

export default function EventsDetailPage() {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);

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
