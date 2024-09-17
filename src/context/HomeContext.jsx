import { createContext, useContext, useState } from "react";

const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [currentSection, setCurrentSection] = useState("home");
  const [openChat, setOpenChat] = useState("");
  const [openChatMobile, setOpenChatMobile] = useState(false);
  return (
    <HomeContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        openChat,
        setOpenChat,
        openChatMobile,
        setOpenChatMobile,
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
