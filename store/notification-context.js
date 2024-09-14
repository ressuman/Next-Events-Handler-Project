import { createContext } from "react";

const NotificationContext = createContext({
  notification: null, //{title, message, status}
  showNotification: function (notificationData) {},
  hideNotification: function (notificationData) {},
});

export function NotificationContextProvider({ children }) {
  return (
    <NotificationContext.Provider>{children}</NotificationContext.Provider>
  );
}

export default NotificationContext;

//value = {};
