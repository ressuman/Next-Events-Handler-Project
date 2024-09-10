import "@/styles/globals.css";
import RootLayout from "@/wrapper/layout/layout";
import Head from "next/head";
import PropTypes from "prop-types";

export default function App({ Component, pageProps }) {
  return (
    <RootLayout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
      </Head>
      <Component {...pageProps} />
    </RootLayout>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
