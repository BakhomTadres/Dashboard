import { createContext, useState } from "react";

export const NotificationContext = createContext(
  null as null | [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    string,
    React.Dispatch<React.SetStateAction<string>>
  ],
);

export default function NotificationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let [showNotification, setShowNotification] = useState<boolean>(false);
  let [notificationType, setNotificationType] = useState<string>("success");

  return (
    <NotificationContext.Provider
      value={[showNotification, setShowNotification, notificationType, setNotificationType]}
    >
      {children}
    </NotificationContext.Provider>
  );
}
