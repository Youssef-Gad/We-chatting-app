import { createContext, useContext, useEffect, useState } from "react";
import { protectedRoute } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// This context handle all authentication process with backend and set current user as global state
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // This useEffect use to make sure that how access home page is logged in with email
  useEffect(() => {
    const checkAuth = async () => {
      const res = await protectedRoute();

      if (res.success === "fail") {
        toast.error("Please Login To Access This Page");
        navigate("/login");
      } else if (res.message === "protected route") {
        setUser(res.user);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider");
  return context;
}
