import { PasswordChangeProvider } from "@/context/PasswordChangeContext";
import { UpdatePasswordComponent } from "@/components";

const ChangePasswordScreen = () => {
  return (
    <PasswordChangeProvider>
      <UpdatePasswordComponent />
    </PasswordChangeProvider>
  );
};

export default ChangePasswordScreen;
