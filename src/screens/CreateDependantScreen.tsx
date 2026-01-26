import { CreateDependents } from "@/components";
import { DependentProvider } from "@/context/DependentContext";

const CreateDependantScreen = () => {
  return (
    <DependentProvider>
      <CreateDependents />
    </DependentProvider>
  );
};

export default CreateDependantScreen;
