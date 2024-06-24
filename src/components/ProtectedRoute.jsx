import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthLoaded } = useContext(AuthContext);

  if (!isAuthLoaded) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    children
  );
};

export default ProtectedRoute;
