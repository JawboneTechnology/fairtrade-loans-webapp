import { useState } from "react";
import { FaCircleCheck, FaUserPlus } from "react-icons/fa6";
import { HiArrowNarrowLeft } from "react-icons/hi";
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

  const totalSteps = 4;
  const stepPercentage = (step / totalSteps) * 100;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section with Gradient Background */}
        <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 pb-8 pt-12 px-4 rounded-b-3xl shadow-xl">
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-secondary/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-light/10 rounded-full blur-lg"></div>

          {/* Header Content */}
          <div className="relative z-10">
            {/* Back Button */}
            <button
              onClick={() => navigate("/auth-login")}
              className="flex items-center text-white hover:text-white/80 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 py-2 rounded-full mb-6 transition-all duration-200 active:scale-95 border border-white/20"
            >
              <HiArrowNarrowLeft className="mr-2 text-xl" />
              Back to Login
            </button>

            {/* Title Section */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                  <FaUserPlus className="text-3xl text-white" />
                </div>
              </div>
              <h1 className="text-white font-bold text-2xl sm:text-3xl mb-2">
                Employee Registration
              </h1>
              <p className="text-white/80 text-sm">
                Create your account to access Fairtrade services
              </p>
            </div>

            {/* Step Progress Indicator */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/90 text-sm font-medium">
                  Step {step} of {totalSteps}
                </span>
                <span className="text-white/90 text-sm font-medium">
                  {Math.round(stepPercentage)}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${stepPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mt-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`flex-1 flex items-center ${stepNum < totalSteps ? "mr-2" : ""
                    }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${stepNum <= step
                      ? "bg-white text-primary"
                      : "bg-white/20 text-white/60"
                      }`}
                  >
                    {stepNum < step ? (
                      <FaCircleCheck className="text-xs" />
                    ) : (
                      stepNum
                    )}
                  </div>
                  {stepNum < totalSteps && (
                    <div
                      className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${stepNum < step ? "bg-white" : "bg-white/20"
                        }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 -mt-4 relative z-10 pb-32">
          <div className="max-w-2xl mx-auto">
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
      </div>

      {/* Step Controls - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-30">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={handlePrevious}
                className="w-32 bg-gray-100 hover:bg-gray-200 text-dark py-4 px-6 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center border border-gray-200"
              >
                Previous
              </button>
            )}

            <div className={`flex-1 ${step > 1 ? "" : "w-full"}`}>
              {step < 4 ? (
                <button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-4 px-6 rounded-2xl font-bold transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-95 flex items-center justify-center"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={() => handleRegister(toggleShowSuccessModal)}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-4 px-6 rounded-2xl font-bold transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-95 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" color="text-white" />
                      <span className="ml-2">Submitting...</span>
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <Modal onClose={toggleShowSuccessModal} className="w-full sm:w-[50%]">
          <div className="p-8 w-[95%] mx-auto bg-white rounded-3xl shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-full p-6 border-4 border-green-200">
                <FaCircleCheck className="text-6xl text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center text-dark mb-3">
              Account Created Successfully!
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-200 mb-6">
              <p className="text-dark/80 text-center leading-relaxed">
                🎉 Congratulations! Your account has been created successfully.
                Please check your email for a verification link. After verifying,
                you can log in to your account and start using Fairtrade services.
              </p>
            </div>
            <button
              onClick={() => navigate("/auth-login")}
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-4 px-6 rounded-2xl font-bold transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
            >
              Go to Login
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RegisterComponent;
