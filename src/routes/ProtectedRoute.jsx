import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "../components";
import { AuthContext } from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;
