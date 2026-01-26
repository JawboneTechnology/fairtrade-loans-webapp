import { ApplyForGrantComponent } from "@/components";
import { GrantsProvider } from "@/context/GrantsContext";
import { DependentProvider } from "@/context/DependentContext";

const ApplyGrantScreen = () => {
  return (
    <DependentProvider>
      <GrantsProvider>
        <ApplyForGrantComponent />
      </GrantsProvider>
    </DependentProvider>
  );
};

export default ApplyGrantScreen;
