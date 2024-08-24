import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!Object.entries(user).length) return <Navigate to="/" />;
  else return <div>{children}</div>;
}

export default ProtectedRoute;
