import { WebsiteWrapper } from "@/screens";
import { LoginComponent } from "@/components";
import { UserLoginProvider } from "@/context/UserLoginContext";

const LoginScreen = () => {
  return (
    <WebsiteWrapper>
      <UserLoginProvider>
        <LoginComponent />
      </UserLoginProvider>
    </WebsiteWrapper>
  );
};

export default LoginScreen;
