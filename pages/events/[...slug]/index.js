import ErrorAlert from "@/components/error-alert/error-alert";
import EventList from "@/components/event-list/event-list";
import ResultsTitle from "@/components/results-title/results-title";
import Button from "@/components/ui/button";
import { getFilteredEvents } from "@/helpers/utils/api-utils";

import { useRouter } from "next/router";

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

export default function FilteredEventsPage({ hasError, events, date }) {
  const router = useRouter();

  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const { year, month } = date;

  const formatDate = new Date(year, month - 1);

  return (
    <>
      <ResultsTitle date={formatDate} />
      <EventList items={filteredEvents} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const filteredYear = slug[0];
  const filteredMonth = slug[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      //notFound: true,
      // redirect: {
      //   destination: "/error",
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
