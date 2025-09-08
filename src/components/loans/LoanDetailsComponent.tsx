import { useState } from "react";
import { useLocation } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import {
  Modal,
  Spinner,
  RightDrawer,
  CustomSwitch,
  UniversalButton,
  LoanInvoiceDetails,
  CircularProgressBar,
} from "@/components";
import { MdSend } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import useScreenSize from "@/hooks/useScreenSize";
import { GuarantorLoan } from "@/types/LoanTypes";
import { useUserAccount } from "@/context/UserAccountContext";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

const LoanDetailsComponent = () => {
  const location = useLocation();
  const { isMobile } = useScreenSize();
  const [showDrawer, setShowDrawer] = useState(false);
  const loanId = location.pathname.split("/")[2];
  const { formatCurrency } = useCurrencyFormatter();
  const [emailData, setEmailData] = useState<{ send_email: boolean }>({
    send_email: false,
  });
  const { loanDetails, getLoanMiniStatement, loadingLoanMiniStatement } =
    useUserAccount();
  const { loanType, loan, guarantors } = loanDetails || {
    loanType: {},
    loan: {},
    guarantors: [],
  };
  const [showConcentModal, setShowConcentModal] = useState<boolean>(false);

  const toggleShowDrawer = () => setShowDrawer((prev) => !prev);
  const toggleShowConcentModal = () => setShowConcentModal((prev) => !prev);

  // Format date strings for better readability
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="sticky top-6 w-full max-w-[90%] sm:max-w-[80%] mx-auto">
        {/* Back Button */}
        <button
          className="flex items-center text-primary hover:text-gray-700 bg-secondary hover:bg-light-hover px-6 py-2 rounded-full"
          onClick={() => window.history.back()}
        >
          <HiArrowNarrowLeft className="mr-2 text-2xl" />
          Back
        </button>
      </div>

      <div className="w-full max-w-[90%] sm:max-w-[80%] mx-auto overflow-y-auto pb-[200px] mt-10">
        {/* Loan Overview Section */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 pb-10">
          <h2 className="text-xl font-bold mb-4">Loan Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <div className="border border-light rounded-lg p-2 md:p-4">
              <p className="text-gray-600 text-sm">Loan Type</p>
              <p className="font-medium text-primary">{loanType.name}</p>
            </div>
            <div className="border border-light rounded-lg p-2 md:p-4">
              <p className="text-gray-600 text-sm">Loan Number</p>
              <p className="font-medium text-primary">{loan.loan_number}</p>
            </div>
            <div className="border border-light rounded-lg p-2 md:p-4">
              <p className="text-gray-600 text-sm">Loan Amount</p>
              <p className="font-medium text-primary">
                {formatCurrency(Number(loan.loan_amount))}
              </p>
            </div>
            <div className="border border-light rounded-lg p-2 md:p-4">
              <p className="text-gray-600 text-sm">Loan Balance</p>
              <p className="font-medium text-primary">
                {formatCurrency(Number(loan.loan_balance))}
              </p>
            </div>
            <div className="border border-light rounded-lg p-2 md:p-4">
              <p className="text-gray-600 text-sm">Next Due Date</p>
              <p className="font-medium text-primary">
                {loan.next_due_date ? formatDate(loan.next_due_date) : "N/A"}
              </p>
            </div>
            <div className="border border-light rounded-lg p-2 md:p-4">
              <p className="text-gray-600 text-sm">Monthly Installment</p>
              <p className="font-medium text-primary">
                {formatCurrency(Number(loan.monthly_installment))}
              </p>
            </div>
            <div className="border border-light rounded-lg p-2 md:p-4">
              <p className="text-gray-600 text-sm">Interest Rate</p>
              <p className="font-medium text-primary">{loan.interest_rate}%</p>
            </div>
            <div className="border border-light rounded-lg p-2 md:p-4">
              <p className="text-gray-600 text-sm">Loan Status</p>
              <p className="font-medium capitalize text-green-500">
                {loan.loan_status}
              </p>
            </div>
          </div>
        </section>

        {/* Guarantors Section */}
        <section className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
          <h2 className="text-xl font-bold mb-4">Guarantors</h2>
          <div className="space-y-4">
            {guarantors?.map((guarantor: GuarantorLoan) => (
              <div
                key={guarantor.id}
                className="pb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-light rounded-lg p-4"
              >
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Name</p>
                  <p className="font-semibold">
                    {guarantor.user.first_name} {guarantor.user.middle_name}{" "}
                    {guarantor.user.last_name}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Phone Number</p>
                  <p className="font-semibold">{guarantor.user.phone_number}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Liability Amount</p>
                  <p className="font-semibold">
                    {formatCurrency(
                      Number(guarantor.guarantor_liability_amount)
                    )}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Status</p>
                  <p className="font-semibold capitalize">{guarantor.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Remarks Section */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Remarks</h2>
          <p className="text-gray-600 italic ">
            {loan.remarks || "No Remarks"}
          </p>
        </section>

        {/* Qualifications Section */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Qualifications</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Total Loans</p>
              <p className="font-semibold">
                {loan.qualifications?.total_loans}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-600">Defaults</p>
              <p className="font-semibold">{loan.qualifications?.defaults}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-600">Successful Repayments</p>
              <p className="font-semibold">
                {loan.qualifications?.successfulRepayments}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-3">Credit Score</p>
              <div className="">
                <CircularProgressBar
                  completed={loan.qualifications?.credit_score || 0}
                  height="100px"
                  isLabelVisible={true}
                  labelSize="14px"
                  label="score"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Request Invoice Button */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border border-gray-200 w-full sm:max-w-[80%] mx-auto z-10">
        <button
          onClick={toggleShowConcentModal}
          className="bg-primary text-white py-3 px-6 rounded-lg w-full"
        >
          {loadingLoanMiniStatement ? (
            <Spinner size="md" color="text-white" />
          ) : (
            "Request Invoice"
          )}
        </button>
      </div>

      {/* Drawer */}
      <RightDrawer
        isOpen={showDrawer}
        drawerWidth={isMobile ? "100%" : "60%"}
        onClose={toggleShowDrawer}
      >
        <LoanInvoiceDetails />
      </RightDrawer>

      {showConcentModal && (
        <Modal onClose={toggleShowConcentModal} className="w-full sm:w-[50%]">
          <div className="p-10 w-[95%] mx-auto bg-white rounded-xl">
            <div className="flex items-center justify-center mb-5">
              <FaFilePdf className="text-[100px] text-primary" />
            </div>

            <h3 className="text-2xl font-semibold text-center">
              Want to receive copy?
            </h3>
            <p className="mt-2 text-gray-600 text-center">
              A copy if the mini statement will be sent to your email address.
              Toggle the switch below to enable this feature.
            </p>

            <div className="mt-5">
              <div className="flex justify-between items-center border rounded-xl">
                <div className="p-3">
                  <h5 className="font-semibold">Enable Email Sending</h5>
                </div>

                <div className="flex justify-center p-3">
                  <CustomSwitch
                    enabled={emailData.send_email}
                    onToggle={() =>
                      setEmailData({
                        ...emailData,
                        send_email: !emailData.send_email,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <UniversalButton
                className="bg-primary hover:bg-primary-dark w-full text-white rounded-full py-2 text-lg"
                title={!loadingLoanMiniStatement && "Get Statement"}
                handleClick={() =>
                  getLoanMiniStatement(
                    loanId,
                    toggleShowDrawer,
                    toggleShowConcentModal,
                    emailData
                  )
                }
                icon={
                  loadingLoanMiniStatement ? (
                    <Spinner size="md" color="text-white" />
                  ) : (
                    <MdSend className="text-xl ml-2" />
                  )
                }
                isCustomIcon={true}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LoanDetailsComponent;
