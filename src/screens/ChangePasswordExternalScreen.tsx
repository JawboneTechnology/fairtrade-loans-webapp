import { PasswordChangeProvider } from "@/context/PasswordChangeContext";
import { UpdatePasswordExternalComponent } from "@/components";
import { WebsiteWrapper } from "@/screens";

const ChangePasswordExternalScreen = () => {
  return (
    <WebsiteWrapper>
      <PasswordChangeProvider>
        <UpdatePasswordExternalComponent />
      </PasswordChangeProvider>
    </WebsiteWrapper>
  );
};

export default ChangePasswordExternalScreen;
