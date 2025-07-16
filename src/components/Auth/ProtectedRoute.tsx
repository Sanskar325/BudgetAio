
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    // If not logged in and not on the home page or login page, redirect to login
    if (!isLoggedIn && 
        location.pathname !== "/" && 
        location.pathname !== "/login") {
      navigate("/login");
    }
  }, [navigate, location]);
  
  return <>{children}</>;
};

export default ProtectedRoute;
