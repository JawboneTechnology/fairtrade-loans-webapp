import { DependentsComponent } from "@/components";
import { DependentProvider } from '@/context/DependentContext';

const DependentsScreen = () => {
  return (
    <DependentProvider>
      <DependentsComponent />
    </DependentProvider>
  );
};

export default DependentsScreen;
