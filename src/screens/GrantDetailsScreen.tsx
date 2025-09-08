import { WebsiteWrapper } from "@/screens";
import { GrantDetailsComponent } from "@/components";
import { DependentProvider } from "@/context/DependentContext";

const GrantDetailsScreen = () => {
  return (
    <WebsiteWrapper>
      <DependentProvider>
        <GrantDetailsComponent />
      </DependentProvider>
    </WebsiteWrapper>
  );
};

export default GrantDetailsScreen;
