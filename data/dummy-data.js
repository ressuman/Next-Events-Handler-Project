const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Programming for Everyone",
    description:
      "Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.",
    location: "Somestreet 25, 12345 San Somewhereo",
    date: "2021-05-12",
    image: "images/coding-event.avif",
    isFeatured: false,
  },
  {
    id: "e2",
    title: "Networking for Introverts",
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: "New Wall Street 5, 98765 New Work",
    date: "2021-05-30",
    image: "images/introvert-event.avif",
    isFeatured: true,
  },
  {
    id: "e3",
    title: "Networking for Extroverts",
    description:
      "You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.",
    location: "My Street 12, 10115 Broke City",
    date: "2022-04-10",
    image: "images/extrovert-event.avif",
    isFeatured: true,
  },
  {
    id: "e4",
    title: "Advanced JavaScript Workshop",
    description:
      "Take your JavaScript skills to the next level! This workshop is for developers looking to master the advanced concepts of the language.",
    location: "Tech Campus 10, 54321 Code City",
    date: "2021-06-15",
    image: "images/javascript-event.avif",
    isFeatured: true,
  },
  {
    id: "e5",
    title: "AI & Machine Learning Conference",
    description:
      "Dive into the world of artificial intelligence and machine learning with this comprehensive conference. Learn from industry experts!",
    location: "AI Avenue 22, 67890 Silicon Valley",
    date: "2021-09-01",
    image: "images/ai-event.avif",
    isFeatured: false,
  },
  {
    id: "e6",
    title: "UX/UI Design Bootcamp.",
    description:
      "Want to become a design pro? Join this bootcamp to explore user experience and user interface design with hands-on sessions.",
    location: "Design Street 45, 24680 Creativity Town",
    date: "2021-11-20",
    image: "images/uiux-event.avif",
    isFeatured: true,
  },
  {
    id: "e7",
    title: "Cybersecurity Essentials.",
    description:
      "In a world full of cyber threats, it's important to stay safe. This event will cover the key principles of cybersecurity for individuals and businesses.",
    location: "Security Blvd 33, 98765 Safe City",
    date: "2021-07-10",
    image: "images/cybersecurity-event.avif",
    isFeatured: false,
  },
  {
    id: "e8",
    title: "Data Science with Python.",
    description:
      "Learn how to analyze data and build models using Python in this hands-on workshop. Perfect for aspiring data scientists!",
    location: "Analytics Road 12, 54321 Data City",
    date: "2021-08-15",
    image: "images/data-event.avif",
    isFeatured: true,
  },
];

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export function getEventById(id) {
  return DUMMY_EVENTS.find((event) => event.id === id);
}
