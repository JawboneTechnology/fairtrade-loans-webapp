import { PasswordResetComponent } from "@/components";
import { UserLoginProvider } from "@/context/UserLoginContext";

const PasswordResetScreen = () => {
  return (
    <div>
      <UserLoginProvider>
        <PasswordResetComponent />
      </UserLoginProvider>
    </div>
  );
};

export default PasswordResetScreen;
