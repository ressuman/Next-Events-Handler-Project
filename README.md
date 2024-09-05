# Events Handler App

The **Events Handler App** is a dynamic events management application built with **Next.js 14** (Pages Router). It allows users to browse, search for, and view details of various events. The application includes a responsive interface, modular components, and a smooth navigation experience for exploring event details.

## Table of Contents

- [Events Handler App](#events-handler-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Folder Structure](#folder-structure)
  - [Gif](#gif)
  - [](#)
  - [Getting Started](#getting-started)
  - [Learn More](#learn-more)
  - [Deploy on Vercel](#deploy-on-vercel)

## Features

- List and view event details.
- Search for events by date (year and month).
- Modular and reusable components.
- Integration of SVG icons for logistics.
- Styled using CSS Modules.

## Folder Structure

```bash
📁components
 ├── 📁error-alert
 │   ├── error-alert.js
 │   └── error-alert.module.css
 ├── 📁event-content
 │   ├── event-content.js
 │   └── event-content.module.css
 ├── 📁event-item
 │   ├── event-item.js
 │   └── event-item.module.css
 ├── 📁event-list
 │   ├── event-list.js
 │   └── event-list.module.css
 ├── 📁event-logistics
 │   ├── event-logistics.js
 │   └── event-logistics.module.css
 ├── 📁event-search
 │   ├── event-search.js
 │   └── event-search.module.css
 ├── 📁event-summary
 │   ├── event-summary.js
 │   └── event-summary.module.css
 ├── 📁icons
 │   ├── address-icon.js
 │   ├── arrow-right-icon.js
 │   └── date-icon.js
 ├── 📁logistics-item
 │   ├── logistics-item.js
 │   └── logistics-item.module.css
 ├── 📁results-title
 │   ├── results-title.js
 │   └── results-title.module.css
 ├── 📁ui
 │   ├── button.js
 │   └── button.module.css
📁data
 └── dummy-data.js
📁pages
 ├── 📁events
 │   ├── 📁[...slug]
 │   │   └── index.js
 │   ├── 📁[eventId]
 │   │   └── index.js
 │   └── index.js
 ├── _app.js
 ├── _document.js
 └── index.js
📁public
 ├── 📁images
 │   ├── ai-event.avif
 │   ├── coding-event.avif
 │   ├── cybersecurity-event.avif
 │   ├── data-event.avif
 │   ├── extrovert-event.avif
 │   ├── introvert-event.avif
 │   ├── javascript-event.avif
 │   └── uiux-event.avif
 └── icon.svg
📁styles
 └── globals.css
📁wrapper
 ├── 📁header
 │   ├── main-header.js
 │   └── main-header.module.css
 └── 📁layout
     └── layout.js
.eslintrc.json
.gitignore
jsconfig.json
next.config.mjs
package-lock.json
package.json
README.md
```

````

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/events-handler-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd events-handler-app
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the App

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Technology Stack

- **Next.js 14** (Pages Router)
- **React**
- **CSS Modules** for styling
- **JavaScript**

## Components Overview

- **ErrorAlert**: Displays error messages.
- **EventContent**: Manages event content layout and details.
- **EventItem**: Represents an individual event in the event list.
- **EventList**: Displays a list of events using `EventItem`.
- **EventLogistics**: Displays logistics such as date and location for an event.
- **EventSearch**: Search form for filtering events by year and month.
- **EventSummary**: Provides an overview of an event's title.
- **Icons**: Includes SVG icons for logistics and navigation.
- **LogisticsItem**: Handles the display of logistics-related items (date, location).
- **ResultsTitle**: Displays the title of search results.
- **Button**: Reusable button component for navigation and interactions.

## License

This project is licensed under the MIT License.

````

This `README.md` reflects your folder structure, project details, and key components. You can replace the GitHub repository link placeholder with your actual URL when sharing it.

## Gif

Here is an expected gif of the preview of the App(Events Handler App)

## ![Events Handler App gif](./assets/training-auth.gif)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
