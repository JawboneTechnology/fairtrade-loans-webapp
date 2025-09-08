import { WebsiteWrapper } from "@/screens";
import { DependentsComponent } from "@/components";
import { DependentProvider } from '@/context/DependentContext';

const DependentsScreen = () => {
  return (
    <WebsiteWrapper>
      <DependentProvider>
        <DependentsComponent />
      </DependentProvider>
    </WebsiteWrapper>
  );
};

export default DependentsScreen;
