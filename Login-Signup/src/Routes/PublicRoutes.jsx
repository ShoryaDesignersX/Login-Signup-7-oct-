import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const userLogged = localStorage.getItem("jwttoken");
  if (userLogged) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;

};

export default PublicRoute;
