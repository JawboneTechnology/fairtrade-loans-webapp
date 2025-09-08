import { Outlet } from "react-router-dom";
import { WebsiteWrapper } from "@/screens";

const OpenLayout = () => {
  return (
    <>
      <WebsiteWrapper>
        <Outlet />
      </WebsiteWrapper>
    </>
  );
};

export default OpenLayout;
