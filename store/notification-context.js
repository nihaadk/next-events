import { createContext, useState, useEffect } from "react";

const NotificationContex = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContexProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotification(notificationData) {
    setActiveNotification(notificationData);
  }
  function hideNotification() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotification,
    hideNotification: hideNotification,
  };

  return (
    <NotificationContex.Provider value={context}>
      {props.children}
    </NotificationContex.Provider>
  );
}

export default NotificationContex;
