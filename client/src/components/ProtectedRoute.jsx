// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // agar token hi nahi hai
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // agar role match nahi karta (e.g. staff ne admin page khola)
  if (role && role !== userRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
