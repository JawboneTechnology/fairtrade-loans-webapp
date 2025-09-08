import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/UseAuthStore";

interface AuthRedirectProps {
  element: ReactNode;
}

const AuthRedirect = ({ element }: AuthRedirectProps) => {
  const { token } = useAuthStore();

  return !token ? <Navigate to="/auth-login" replace /> : element;

  // return element;
};

export default AuthRedirect;
