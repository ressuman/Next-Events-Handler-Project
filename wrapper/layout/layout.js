import MainHeader from "../header/main-header";
import PropTypes from "prop-types";

export default function RootLayout({ children }) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
