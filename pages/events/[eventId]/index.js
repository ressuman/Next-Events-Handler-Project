import { getEventById } from "@/data/dummy-data";
import { useRouter } from "next/router";

export default function EventsDetailPage() {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return <p>No Event founc!.</p>;
  }

  return (
    <div>
      <h1>Event Detail</h1>
    </div>
  );
}
