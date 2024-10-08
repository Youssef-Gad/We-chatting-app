import { createContext, useContext, useState } from "react";

// This Context is resposiple for home page it detects sections renderes
const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [currentSection, setCurrentSection] = useState("home");

  return (
    <HomeContext.Provider
      value={{
        currentSection,
        setCurrentSection,
      }}
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
