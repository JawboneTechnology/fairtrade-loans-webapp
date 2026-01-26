import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/UseAuthStore";
import useScreenSize from "@/hooks/useScreenSize";
import { Home, Landing } from "@/screens";

/**
 * Root route gate:
 * - Authenticated: show Home
 * - Guest on desktop: show marketing Landing
 * - Guest on mobile/tablet: redirect to login
 */
const HomeGate = () => {
  const { token } = useAuthStore();
  const { isDesktop } = useScreenSize();

  if (token) return <Home />;
  if (isDesktop) return <Landing />;

  return <Navigate to="/auth-login" replace />;
};

export default HomeGate;

