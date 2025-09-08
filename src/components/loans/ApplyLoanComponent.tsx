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
import { HiArrowNarrowLeft } from "react-icons/hi";
import useEnvironment from "@/hooks/useEnvironment";
import { HiArrowNarrowRight } from "react-icons/hi";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const ApplyLoanComponent = () => {
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
      <div className="fixed top-6 left-5">
        {/* Back Button */}
        <button
          className="flex items-center text-primary hover:text-gray-700 bg-secondary hover:bg-light-hover px-6 py-2 rounded-full"
          onClick={() => window.history.back()}
        >
          <HiArrowNarrowLeft className="mr-2 text-2xl" />
          Back
        </button>
      </div>

      {/* Apply Loan Title */}
      <div className="bg-white rounded-t-lg py-4 px-3 border-l border-r border-gray-200 max-w-[90%] sm:max-w-[80%] mx-auto pb-[200px] mt-20 sm:mt-20">
        <h2 className="text-2xl font-bold text-gray-800">
          Apply Loan
        </h2>
        
        {/* Loan Type Selection */}
        <LoanTypes />

        {/* Loan amount period */}
        <LoanAmountPeriod />

        {/* Select Guarantors */}
        {Number(selectedLoanType?.required_guarantors_count || 0) > 0 && (
          <LoanGuarantors />
        )}

        {/* Debug Component */}
        {!isProduction && (
          <DebugComponent
            title="Loan Application"
            debugData={loanApplication}
          />
        )}
      </div>

      {/* Request Invoice Button */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border border-gray-200 w-full sm:max-w-[80%] mx-auto z-10">
        <button
          onClick={toggleShowFeatureModal}
          className="bg-primary text-white py-3 px-6 rounded-lg w-full"
        >
          {loading ? <Spinner size="md" color="text-white" /> : "Apply Now!"}
        </button>
      </div>

      {showFeatureModal && (
        <Modal
          closable={false}
          onClose={toggleShowFeatureModal}
          className="w-full sm:w-[50%]"
        >
          <div className="p-5 py-10 w-[95%] mx-auto bg-white rounded-xl">
            <div className="flex items-center justify-center mb-5">
              <BsFillQuestionCircleFill className="text-[100px] text-primary" />
            </div>

            <h3 className="text-2xl font-semibold text-center text-primary">
              Are you sure?
            </h3>
            <p className="mt-2 text-gray-600 text-center">
              You are about to apply for a loan. Please make sure you have
              provided the correct information.
            </p>

            <p className="mt-2 text-gray-600 text-center border bg-light border-primary/50 p-3 rounded-lg italic">
              All the guarantors you selected will receive an email to confirm
              their participation in your loan application. You will be notified
              when each of them confirms.
            </p>

            <div className="mt-5">
              {/* Apply Button */}
              <UniversalButton
                className="bg-primary hover:bg-primary-dark w-full text-white rounded-full py-2 text-lg"
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
                className="bg-light hover:bg-primary/50 w-full text-primary rounded-full py-2 text-lg mt-3"
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
          <div className="p-5 py-10 w-[95%] mx-auto bg-white rounded-xl">
            <div className="flex items-center justify-center mb-5">
              <FaCircleCheck className="text-[100px] text-primary" />
            </div>

            <h3 className="text-2xl font-semibold text-center text-primary">
              Loan Application Successful!
            </h3>
            <p className="mt-2 text-gray-600 text-center">
              Your loan application has been submitted successfully. You will
              receive a confirmation email shortly.
            </p>

            <div className="mt-5">
              <UniversalButton
                className="bg-primary hover:bg-primary-dark w-full text-white rounded-full py-2 text-lg"
                title="Close"
                handleClick={toggleSuccessModal}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ApplyLoanComponent;
