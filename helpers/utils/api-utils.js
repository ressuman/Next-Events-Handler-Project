export async function getAllEvents() {
  const url = process.env.FB_RTDB_REF_URL;

  const response = await fetch(`${url}/events.json`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  const transformedEventsIntoArray = [];

  for (const key in data) {
    // transformedEventsIntoArray.push({
    //   id: key,
    //   title: data[key].title,
    //   description: data[key].description,
    //   location: data[key].location,
    //   date: data[key].date,
    //   image: data[key].image,
    //   isFeatured: data[key].isFeatured,
    // });
    transformedEventsIntoArray.push({
      id: key,
      ...data[key],
    });
  }

  return transformedEventsIntoArray;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();

  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();

  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
