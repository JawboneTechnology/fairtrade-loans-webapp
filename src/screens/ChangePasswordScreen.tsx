import { PasswordChangeProvider } from "@/context/PasswordChangeContext";
import { UpdatePasswordComponent } from "@/components";
import { WebsiteWrapper } from "@/screens";

const ChangePasswordScreen = () => {
  return (
    <WebsiteWrapper>
      <PasswordChangeProvider>
        <UpdatePasswordComponent />
      </PasswordChangeProvider>
    </WebsiteWrapper>
  );
};

export default ChangePasswordScreen;
