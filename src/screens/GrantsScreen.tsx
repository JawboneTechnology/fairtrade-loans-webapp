import { WebsiteWrapper } from "@/screens";
import { GrantsComponent } from "@/components";
import { GrantsProvider } from "@/context/GrantsContext";

const GrantsScreen = () => {
  return (
    <WebsiteWrapper>
      <GrantsProvider>
        <GrantsComponent />
      </GrantsProvider>
    </WebsiteWrapper>
  );
};

export default GrantsScreen;
