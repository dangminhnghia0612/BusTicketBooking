import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function UserProtectedRoute({ children }) {
  const isUserLoggedIn = Cookies.get("isUserLoggedIn") === "true";
  if (!isUserLoggedIn) {
    return <Navigate to="/dangnhap" replace />;
  }
  return children;
}
