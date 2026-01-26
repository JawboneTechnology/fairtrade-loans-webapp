import { ValidateProfileComponent } from "@/components";
import { UserLoginProvider } from "@/context/UserLoginContext";

const ValidateProfileScreen = () => {
  return (
    <div>
      <UserLoginProvider>
        <ValidateProfileComponent />
      </UserLoginProvider>
    </div>
  );
};

export default ValidateProfileScreen;
