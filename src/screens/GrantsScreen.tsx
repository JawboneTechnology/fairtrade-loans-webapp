import { GrantsComponent } from "@/components";
import { GrantsProvider } from "@/context/GrantsContext";

const GrantsScreen = () => {
  return (
    <GrantsProvider>
      <GrantsComponent />
    </GrantsProvider>
  );
};

export default GrantsScreen;
