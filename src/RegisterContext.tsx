import { createContext, useState } from "react";

export const RegisterContext = createContext(
  null as null | [boolean, React.Dispatch<React.SetStateAction<boolean>>],
);

export default function RegisterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let [isRegistered, setIsRegistered] = useState<boolean>(
    localStorage.getItem("token") ? true : false
  );
  return (
    <RegisterContext.Provider value={[isRegistered, setIsRegistered]}>
      {children}
    </RegisterContext.Provider>
  );
}
