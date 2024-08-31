import { createContext, useContext, useState } from "react";

const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [currentSection, setCurrentSection] = useState("home");
  const [activeChat, setActiveChat] = useState(false);
  return (
    <HomeContext.Provider
      value={{ currentSection, setCurrentSection, activeChat, setActiveChat }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export function useHome() {
  const context = useContext(HomeContext);
  if (context === undefined)
    throw new Error("HomeContext was used outside of HomeProvider");
  return context;
}
