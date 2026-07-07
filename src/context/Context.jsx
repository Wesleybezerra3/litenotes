import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    nome: "",
  });
   const [activeRoute, setActiveRoute] = useState("");
   const [openNote, setOpenNote] = useState(null);
   const [openNoteData, setOpenNoteData] = useState({});

  useEffect(() => {
    console.log("openNote:", openNote);
    console.log("openNoteData:", openNoteData);
  },[openNote, openNoteData])

  // useEffect(()=>{

  // },[onUpdate])
  const logUser = (userData) => setUser(userData);
  return (
    <UserContext.Provider value={{ user, logUser, activeRoute, setActiveRoute, openNote, setOpenNote, openNoteData, setOpenNoteData }}>
        {children}
    </UserContext.Provider>
  );
};