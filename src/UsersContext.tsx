import { createContext, useState, useEffect } from "react";
import axios from "axios";

type UsersContextType = {
  name: [string, React.Dispatch<React.SetStateAction<string>>];
  email: [string, React.Dispatch<React.SetStateAction<string>>];
  isLoading: [boolean];
};

export const UsersContext = createContext<UsersContextType | null>(null);

export default function UsersContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }
      const res = await axios.get(
        "https://dashboard-backend-ebon.vercel.app/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const user = res.data.data.user;
      setName(user.name);
      setEmail(user.email);
      setIsLoading(false);
    };
    fetchData();
    window.addEventListener("userLoggedIn", fetchData);
    return () => window.removeEventListener("userLoggedIn", fetchData);
  }, []);

  return (
    <UsersContext.Provider
      value={{
        name: [name, setName],
        email: [email, setEmail],
        isLoading: [isLoading],
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
