import { LoginComponent } from "@/components";
import { UserLoginProvider } from "@/context/UserLoginContext";

const LoginScreen = () => {
  return (
    <UserLoginProvider>
      <LoginComponent />
    </UserLoginProvider>
  );
};

export default LoginScreen;
