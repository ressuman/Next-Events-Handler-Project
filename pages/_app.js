import Notification from "@/components/notification/notification";
import "@/styles/globals.css";
import RootLayout from "@/wrapper/layout/layout";
import Head from "next/head";
import PropTypes from "prop-types";

export default function App({ Component, pageProps }) {
  return (
    <RootLayout>
      <Head>
        <title>Ressuman Events Handler</title>
        <meta
          name="description"
          content="Everything you need to know about scheduling an event"
        />
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
        <link rel="icon" type="image/svg" href="/icon.svg" />
      </Head>
      <Component {...pageProps} />
      <Notification title="Test" message="This is a test." status="error" />
    </RootLayout>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
