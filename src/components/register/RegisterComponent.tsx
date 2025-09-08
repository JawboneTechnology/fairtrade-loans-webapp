import { useState } from "react";
import { CompanyIcon } from "@/constants/ImageConstants";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaCircleCheck,
  FaUnlock,
} from "react-icons/fa6";
import {
  Modal,
  Spinner,
  AuthNotice,
  DebugComponent,
  UniversalButton,
  RegisterStepOne,
  RegisterStepTwo,
  RegisterStepFour,
  RegisterStepThree,
} from "@/components";
import useEnvironment from "@/hooks/useEnvironment";
import { useRegister } from "@/context/UserRegisterContext";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const { loading, formData, handleRegister } = useRegister();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const toggleShowSuccessModal = () => {
    setShowSuccessModal(!showSuccessModal);
  };
  const isProduction = useEnvironment();
  const [step, setStep] = useState(1);
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <RegisterStepOne />;
      case 2:
        return <RegisterStepTwo />;
      case 3:
        return <RegisterStepThree />;
      case 4:
        return <RegisterStepFour />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white w-full h-screen overflow-y-scroll pb-20">
        <div className="p-5 w-full max-w-lg mx-auto flex flex-col justify-between items-center h-screen overflow-y-auto">
          <div className="text-center p-5">
            <img
              src={CompanyIcon}
              alt="Company Logo"
              className="w-[100px] mx-auto mb-3"
            />
            <h1 className="text-2xl font-bold">Employee Registration</h1>
            <p className="text-gray-500 mt-2">
              Welcome! Please register to create an account. You will receive an
              email with a verification link to verify your account.
            </p>
          </div>

          <div className="flex flex-col space-y-3 w-full">
            <AuthNotice />

            {!isProduction && (
              <DebugComponent title="User Registration" debugData={formData} />
            )}

            {renderStep()}

            {step > 1 && (
              <div className="fixed top-5 left-5">
                <UniversalButton
                  title="Previous"
                  className="w-full bg-primary text-white rounded-full py-2 px-3 mr-2 text-sm"
                  handleClick={handlePrevious}
                  icon={<FaArrowLeftLong className="mr-2" />}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step Buttons */}
      <div className="fixed bottom-0 w-full p-3 z-20 bg-white border-t border-gray-200">
        {step < 4 ? (
          <UniversalButton
            title="Next"
            className={`w-${
              step > 1 ? "full" : "full"
            } bg-primary text-white rounded-full py-3`}
            handleClick={handleNext}
            icon={<FaArrowRightLong className="ml-2" />}
            isCustomIcon={true}
          />
        ) : (
          <UniversalButton
            title={!loading && "Submit"}
            className="w-full bg-primary text-white rounded-full py-3"
            handleClick={() => handleRegister(toggleShowSuccessModal)}
            icon={
              loading ? (
                <Spinner size="sm" color="text-white" />
              ) : (
                <FaArrowRightLong className="ml-2" />
              )
            }
            isCustomIcon={true}
          />
        )}
      </div>

      {showSuccessModal && (
        <Modal onClose={toggleShowSuccessModal} className="w-full sm:w-[50%]">
          <div className="p-5 w-[95%] mx-auto bg-white rounded-xl">
            <div className="flex items-center justify-center mb-5">
              <FaCircleCheck className="text-[100px] text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-center">
              Account Created! <br /> Successfully.
            </h3>
            <p className="mt-2 text-gray-600 text-center">
              You have successfully created an account. Please check your email
              for a verification link. You can now login to your account after
              doing the verification.
            </p>
            <div className="mt-5">
              <UniversalButton
                className="bg-primary hover:bg-primary-dark w-full text-white rounded-full py-2 text-lg"
                title="Login Now"
                handleClick={() => navigate("/auth-login")}
                icon={<FaUnlock className="text-xl mr-2" />}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RegisterComponent;
