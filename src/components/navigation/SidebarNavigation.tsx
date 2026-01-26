import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/UseAuthStore";
import { AiFillHome } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";
import { FaGift, FaCreditCard, FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  match?: (pathname: string) => boolean;
};

const SidebarNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout } = useAuthStore();

  const items: NavItem[] = [
    {
      label: "Home",
      path: "/",
      icon: <AiFillHome className="text-lg" />,
      match: (p) => p === "/",
    },
    {
      label: "Loans",
      path: "/loans",
      icon: <GiReceiveMoney className="text-lg" />,
      match: (p) => p.startsWith("/loans") || p.startsWith("/loan-details") || p === "/apply-loan",
    },
    {
      label: "Grants",
      path: "/grants",
      icon: <FaGift className="text-lg" />,
      match: (p) => p.startsWith("/grants") || p === "/apply-grant",
    },
    {
      label: "Payments",
      path: "/payments",
      icon: <FaCreditCard className="text-lg" />,
      match: (p) => p.startsWith("/payments") || p === "/make-payment",
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: <FaBell className="text-lg" />,
      match: (p) => p.startsWith("/notifications"),
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <FaUserCircle className="text-lg" />,
      match: (p) => p.startsWith("/profile") || p === "/edit-profile" || p === "/update-password" || p === "/delete-account",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => {
        const isActive = item.match ? item.match(pathname) : pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-left ${isActive
              ? "bg-gradient-to-r from-brand to-brand border-brand text-white"
              : "bg-white hover:bg-gray-50 border-gray-100 text-brand"
              }`}
          >
            <span className={`${isActive ? "text-white" : "text-brand/70"}`}>
              {item.icon}
            </span>
            <span className="font-semibold">{item.label}</span>
          </button>
        );
      })}

      <div className="h-px bg-gray-200 my-3" />

      <button
        onClick={() => {
          logout();
          navigate("/auth-login", { replace: true });
        }}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 text-dark transition-all text-left"
      >
        <span className="text-dark/70">
          <FaSignOutAlt className="text-lg" />
        </span>
        <span className="font-semibold">Sign out</span>
      </button>
    </div>
  );
};

export default SidebarNavigation;

