import { WebsiteWrapper } from "@/screens";
import { ValidateProfileComponent } from "@/components";
import { UserLoginProvider } from "@/context/UserLoginContext";

const ValidateProfileScreen = () => {
  return (
    <div>
      <WebsiteWrapper>
        <UserLoginProvider>
          <ValidateProfileComponent />
        </UserLoginProvider>
      </WebsiteWrapper>
    </div>
  );
};

export default ValidateProfileScreen;
