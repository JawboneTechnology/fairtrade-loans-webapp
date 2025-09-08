import { WebsiteWrapper } from "@/screens";
import { ApplyForGrantComponent } from "@/components";
import { GrantsProvider } from "@/context/GrantsContext";
import { DependentProvider } from "@/context/DependentContext";

const ApplyGrantScreen = () => {
  return (
    <WebsiteWrapper>
      <DependentProvider>
        <GrantsProvider>
          <ApplyForGrantComponent />
        </GrantsProvider>
      </DependentProvider>
    </WebsiteWrapper>
  );
};

export default ApplyGrantScreen;
