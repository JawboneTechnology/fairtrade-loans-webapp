import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/UseAuthStore";

import { ReactElement } from "react";

const GuestRedirect = ({ element }: { element: ReactElement }) => {
  const { token } = useAuthStore();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default GuestRedirect;
