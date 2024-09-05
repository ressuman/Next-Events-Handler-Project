import "@/styles/globals.css";
import RootLayout from "@/wrapper/layout/layout";
import PropTypes from "prop-types";

export default function App({ Component, pageProps }) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
