import { WebsiteWrapper } from "@/screens";
import { CreateDependents } from "@/components";
import { DependentProvider } from "@/context/DependentContext";

const CreateDependantScreen = () => {
  return (
    <WebsiteWrapper>
      <DependentProvider>
        <CreateDependents />
      </DependentProvider>
    </WebsiteWrapper>
  );
};

export default CreateDependantScreen;
