import { createContext, useState } from "react";

export const UserContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    nome: "",
  });
   const [activeRoute, setActiveRoute] = useState("");

  // useEffect(()=>{

  // },[onUpdate])
  const logUser = (userData) => setUser(userData);
  return (
    <UserContext.Provider value={{ user, logUser, activeRoute, setActiveRoute }}>
        {children}
    </UserContext.Provider>
  );
};