import { WebsiteWrapper } from "@/screens";
import { PasswordResetComponent } from "@/components";
import { UserLoginProvider } from "@/context/UserLoginContext";

const PasswordResetScreen = () => {
  return (
    <div>
      <WebsiteWrapper>
        <UserLoginProvider>
          <PasswordResetComponent />
        </UserLoginProvider>
      </WebsiteWrapper>
    </div>
  );
};

export default PasswordResetScreen;
