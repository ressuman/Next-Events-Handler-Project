import EventList from "@/components/event-list/event-list";
import { getFeaturedEvents } from "@/data/dummy-data";

export default function Home() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {


  return {
    props:{
      featuredEvents:
    }
  }
}