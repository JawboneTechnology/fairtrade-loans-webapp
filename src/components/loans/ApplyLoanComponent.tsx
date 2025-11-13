import {
  Modal,
  Spinner,
  LoanTypes,
  LoanGuarantors,
  UniversalButton,
  DebugComponent,
  LoanAmountPeriod,
} from "@/components";
import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useLoans } from "@/context/LoanContext";
import { useNavigate } from "react-router-dom";
import useEnvironment from "@/hooks/useEnvironment";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";

const ApplyLoanComponent = () => {
  const navigate = useNavigate();
  const [loading, _] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const toggleSuccessModal = () => setShowSuccessModal(!showSuccessModal);
  const toggleShowFeatureModal = () => setShowFeatureModal(!showFeatureModal);
  const { applyLoan, loanApplication, loadingLoanApply, selectedLoanType } =
    useLoans();
  const isProduction = useEnvironment();

  return (
    <>
      <div className="min-h-screen">
        {/* Header Section with Gradient Background */}
        <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 pb-8 pt-12 px-4 rounded-b-3xl shadow-xl">
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-secondary/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-light/10 rounded-full blur-lg"></div>

          {/* Header Content */}
          <div className="relative z-10">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-white hover:text-white/80 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 py-2 rounded-full mb-6 transition-all duration-200 active:scale-95 border border-white/20"
            >
              <HiArrowNarrowLeft className="mr-2 text-xl" />
              Back
            </button>

            {/* Title Section */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                  <GiReceiveMoney className="text-3xl text-white" />
                </div>
              </div>
              <h1 className="text-white font-bold text-2xl sm:text-3xl mb-2">
                Apply for Loan
              </h1>
              <p className="text-white/80 text-sm">
                Fill in your loan application details
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 -mt-4 relative z-10 space-y-6 pb-32">
          {/* Loan Type Selection Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <LoanTypes />
          </div>

          {/* Loan Amount Period Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <LoanAmountPeriod />
          </div>

          {/* Select Guarantors Card */}
          {Number(selectedLoanType?.required_guarantors_count || 0) > 0 && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <LoanGuarantors />
            </div>
          )}

          {/* Debug Component */}
          {!isProduction && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <DebugComponent
                title="Loan Application"
                debugData={loanApplication}
              />
            </div>
          )}
        </div>
      </div>

      {/* Fixed Apply Button at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-[90%] sm:max-w-[80%] mx-auto p-4">
          <button
            onClick={toggleShowFeatureModal}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2 active:scale-95"
          >
            {loading ? (
              <>
                <Spinner size="sm" color="text-white" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Apply Now!</span>
              </>
            )}
          </button>
        </div>
      </div>

      {showFeatureModal && (
        <Modal
          closable={false}
          onClose={toggleShowFeatureModal}
          className="w-full sm:w-[50%]"
        >
          <div className="p-6 py-10 w-[95%] mx-auto bg-white rounded-3xl">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary/10 rounded-full p-4">
                <BsFillQuestionCircleFill className="text-6xl text-primary" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center text-dark mb-3">
              Confirm Loan Application
            </h3>
            <p className="text-gray-600 text-center mb-4">
              You are about to apply for a loan. Please make sure you have
              provided the correct information.
            </p>

            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 p-4 rounded-2xl mb-6">
              <p className="text-sm text-dark/80 text-center">
                <span className="font-semibold">📧 Important:</span> All the guarantors you selected will receive an email to confirm
                their participation in your loan application. You will be notified
                when each of them confirms.
              </p>
            </div>

            <div className="space-y-3">
              {/* Apply Button */}
              <UniversalButton
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary w-full text-white rounded-2xl py-3 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                title={!loadingLoanApply && "Continue with application"}
                handleClick={() =>
                  applyLoan(toggleShowFeatureModal, toggleSuccessModal)
                }
                icon={
                  loadingLoanApply ? (
                    <Spinner size="sm" color="text-white" />
                  ) : (
                    <HiArrowNarrowRight className="text-xl" />
                  )
                }
                isCustomIcon={true}
              />

              {/* Cancel Button */}
              <UniversalButton
                className="bg-light hover:bg-gray-100 w-full text-dark rounded-2xl py-3 text-lg font-semibold border border-gray-200 transition-all duration-200"
                title="Cancel"
                handleClick={toggleShowFeatureModal}
              />
            </div>
          </div>
        </Modal>
      )}

      {showSuccessModal && (
        <Modal
          closable={false}
          onClose={toggleSuccessModal}
          className="w-full sm:w-[50%]"
        >
          <div className="p-6 py-10 w-[95%] mx-auto bg-white rounded-3xl">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4">
                <FaCircleCheck className="text-6xl text-green-600" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center text-dark mb-3">
              🎉 Loan Application Successful!
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Your loan application has been submitted successfully. You will
              receive a confirmation email shortly.
            </p>

            <UniversalButton
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary w-full text-white rounded-2xl py-3 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              title="Close"
              handleClick={toggleSuccessModal}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default ApplyLoanComponent;
