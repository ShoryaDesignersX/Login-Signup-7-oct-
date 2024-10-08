import React from "react";
import { Navigate } from "react-router-dom";

// Example of a ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwttoken"); // Check for the token

  if (!token) {
    // If there's no token, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, allow access to the route
  return children;
};

export default ProtectedRoute;
