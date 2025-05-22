import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = Cookies.get("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/admin/dangnhap" replace />;
  }
  return children;
}
