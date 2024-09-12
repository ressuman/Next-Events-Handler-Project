import EventList from "@/components/events/event-list/event-list";
import NewsletterRegistration from "@/components/input/newsletter-registration/newsletter-registration";
import { getFeaturedEvents } from "@/helpers/utils/api-utils";
import Head from "next/head";

export default function HomePage({ events }) {
  return (
    <>
      <Head>
        <title>Ressuman Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
        <link rel="icon" type="image/svg" href="/icon.svg" />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 500,
  };
}
