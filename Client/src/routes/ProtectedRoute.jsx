import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { LinearProgress } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div><LinearProgress /></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
