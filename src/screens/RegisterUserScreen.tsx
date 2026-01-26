import { RegisterComponent } from "@/components";
import { RegisterProvider } from "@/context/UserRegisterContext";

const RegisterUserScreen = () => {
  return (
    <div>
      <RegisterProvider>
        <RegisterComponent />
      </RegisterProvider>
    </div>
  );
};

export default RegisterUserScreen;
