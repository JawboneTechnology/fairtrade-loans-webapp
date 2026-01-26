import { GrantDetailsComponent } from "@/components";
import { DependentProvider } from "@/context/DependentContext";

const GrantDetailsScreen = () => {
  return (
    <DependentProvider>
      <GrantDetailsComponent />
    </DependentProvider>
  );
};

export default GrantDetailsScreen;
