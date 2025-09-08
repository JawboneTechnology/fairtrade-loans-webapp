import { WebsiteWrapper } from "@/screens";
import { RegisterComponent } from "@/components";
import { RegisterProvider } from "@/context/UserRegisterContext";

const RegisterUserScreen = () => {
  return (
    <div>
      <WebsiteWrapper>
        <RegisterProvider>
          <RegisterComponent />
        </RegisterProvider>
      </WebsiteWrapper>
    </div>
  );
};

export default RegisterUserScreen;
