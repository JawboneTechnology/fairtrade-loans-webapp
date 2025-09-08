import { useState, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNavigationComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab === "home" ? "" : tab}`);
  };

  useEffect(() => {
    const currentPath = pathname;
    if (currentPath === "/") {
      setActiveTab("home");
    } else {
      setActiveTab(currentPath.replace("/", ""));
    }
  }, [pathname]);

  return (
    <div className="w-full bg-primary p-3 fixed bottom-0 left-0 z-20 border-t border-primary/50 shadow-lg">
      <div className="flex justify-around items-center">
        {/* Home */}
        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeTab === "home" ? "text-secondary" : "text-white"
          }`}
          onClick={() => handleTabClick("home")}
        >
          <AiFillHome className="text-2xl" />
          <span className="text-xs mt-1">Home</span>
        </div>

        {/* Loans */}
        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeTab === "loans" ||
            activeTab === "grants" ||
            activeTab === "loans-and-grants"
              ? "text-secondary"
              : "text-white"
          }`}
          onClick={() => handleTabClick("loans-and-grants")}
        >
          <GiReceiveMoney className="text-2xl" />
          <span className="text-xs mt-1">Loans</span>
        </div>

        {/* Payments */}
        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeTab === "payments" ? "text-secondary" : "text-white"
          }`}
          onClick={() => handleTabClick("payments")}
        >
          <FaMoneyCheckAlt className="text-2xl" />
          <span className="text-xs mt-1">payments</span>
        </div>

        {/* Profile */}
        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeTab === "profile" ? "text-secondary" : "text-white"
          }`}
          onClick={() => handleTabClick("profile")}
        >
          <CgProfile className="text-2xl" />
          <span className="text-xs mt-1">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigationComponent;
