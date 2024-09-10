import ErrorAlert from "@/components/error-alert/error-alert";
import EventList from "@/components/event-list/event-list";
import ResultsTitle from "@/components/results-title/results-title";
import Button from "@/components/ui/button";
import { getFilteredEvents } from "@/helpers/utils/api-utils";
import useSWR from "swr";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

// export default function FilteredEventsPage({ hasError, events, date }) {

//   if (hasError) {
//     return (
//       <>
//         <ErrorAlert>
//           <p>Invalid filter. Please adjust your values!.</p>
//         </ErrorAlert>
//         <div className="center">
//           <Button link="/events">Show All Events</Button>
//         </div>
//       </>
//     );
//   }

//   const filteredEvents = events;

//   if (!filteredEvents || filteredEvents.length === 0) {
//     return (
//       <>
//         <ErrorAlert>
//           <p>No events found for the chosen filter!</p>
//         </ErrorAlert>
//         <div className="center">
//           <Button link="/events">Show All Events</Button>
//         </div>
//       </>
//     );
//   }

//   const { year, month } = date;

//   const formatDate = new Date(year, month - 1);

//   return (
//     <>
//       <ResultsTitle date={formatDate} />
//       <EventList items={filteredEvents} />
//     </>
//   );
// }

export default function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();

  const router = useRouter();

  const filteredData = router.query.slug;

  const url = process.env.NEXT_PUBLIC_FB_RTDB_REF_URL;

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`${url}/events.json`, fetcher);
  useEffect(() => {
    if (data) {
      const transformedEventsIntoArray = [];

      for (const key in data) {
        transformedEventsIntoArray.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(transformedEventsIntoArray);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="A list of filtered events" />
      <link rel="icon" type="image/svg" href="/icon.svg" />
    </Head>
  );

  if (!loadedEvents || isLoading) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </>
    );
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}.`}
      />
      <link rel="icon" type="image/svg" href="/icon.svg" />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const formatDate = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={formatDate} />
      <EventList items={filteredEvents} />
    </>
  );
}

// export async function getServerSideProps({ params }) {
//   const { slug } = params;

//   const filteredYear = slug[0];
//   const filteredMonth = slug[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//       //notFound: true,
//       // redirect: {
//       //   destination: "/error",
//       // },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }
