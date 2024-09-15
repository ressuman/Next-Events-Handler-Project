import Notification from "@/components/notification/notification";
import MainHeader from "../header/main-header";
import PropTypes from "prop-types";
import { useContext } from "react";
import NotificationContext from "@/store/notification-context";

export default function RootLayout({ children }) {
  const { notification } = useContext(NotificationContext);

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
