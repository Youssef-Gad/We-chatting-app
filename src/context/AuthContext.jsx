import { createContext, useContext, useEffect, useState } from "react";
import { protectedRoute } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await protectedRoute();

      if (res.success === "fail") {
        toast.error(res.message);
        navigate("/login");
      } else if (res.message === "protected route") setUser(res.user);
    };

    checkAuth();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider");
  return context;
}
