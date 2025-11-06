import { useState } from "react";
import { CompanyIcon } from "@/constants/ImageConstants";
import { FaCircleCheck } from "react-icons/fa6";
import {
  Modal,
  Spinner,
  AuthNotice,
  DebugComponent,
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
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-6">
            <img
              src={CompanyIcon}
              alt="Company Logo"
              className="w-20 mx-auto mb-3"
            />
            <h1 className="text-2xl font-bold">Employee registration</h1>
            <p className="text-dark/70 mt-2">
              Create your account to access Fairtrade services. We'll send a
              verification email once you finish.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="space-y-4">
              <AuthNotice />
              {!isProduction && (
                <DebugComponent
                  title="User Registration"
                  debugData={formData}
                />
              )}

              <div className="mt-2">{renderStep()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          {step > 1 && (
            <button
              onClick={handlePrevious}
              className="flex-1 bg-white border border-gray-200 text-dark py-3 rounded-2xl font-medium hover:shadow-sm"
            >
              Previous
            </button>
          )}

          <div className={`flex-1 ${step > 1 ? "" : "w-full"}`}>
            {step < 4 ? (
              <button
                onClick={handleNext}
                className="w-full bg-primary text-white py-3 rounded-2xl font-bold hover:shadow-lg"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => handleRegister(toggleShowSuccessModal)}
                className="w-full bg-primary text-white py-3 rounded-2xl font-bold hover:shadow-lg flex items-center justify-center"
              >
                {loading ? <Spinner size="sm" color="text-white" /> : "Submit"}
              </button>
            )}
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <Modal onClose={toggleShowSuccessModal} className="w-full sm:w-[50%]">
          <div className="p-6 w-[95%] mx-auto bg-white rounded-2xl shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <FaCircleCheck className="text-6xl text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-center">
              Account created successfully
            </h3>
            <p className="mt-3 text-dark/70 text-center">
              Please check your email for a verification link. After verifying,
              you can log in to your account.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/auth-login")}
                className="w-full bg-primary text-white py-3 rounded-2xl font-semibold"
              >
                Login now
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RegisterComponent;
