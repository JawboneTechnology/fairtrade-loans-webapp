import useAuthStore from "@/store/UseAuthStore";
import { Home, Landing } from "@/screens";

/**
 * Root route gate:
 * - Authenticated: show Home
 * - Guest on desktop: show marketing Landing
 * - Guest on mobile/tablet: redirect to login
 */
const HomeGate = () => {
  const { token } = useAuthStore();

  if (token) return <Home />;
  return <Landing />;
};

export default HomeGate;

