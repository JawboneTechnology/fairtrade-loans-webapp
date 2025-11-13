import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { GiReceiveMoney } from "react-icons/gi";
import useScreenSize from "@/hooks/useScreenSize";
import { GuarantorLoan } from "@/types/LoanTypes";
import { useUserAccount } from "@/context/UserAccountContext";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

const LoanDetailsComponent = () => {
  const navigate = useNavigate();
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
                Loan Details
              </h1>
              <p className="text-white/80 text-sm">
                {loan.loan_number || "View your loan information"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 -mt-4 relative z-10 space-y-6 pb-32">
          {/* Loan Overview Section */}
          <section className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">📊</span>
              <h2 className="text-xl font-bold text-dark">Loan Overview</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 border border-primary/10">
                <p className="text-dark/60 text-xs mb-1">Loan Type</p>
                <p className="font-bold text-primary text-sm">{loanType.name || "N/A"}</p>
              </div>
              <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-4 border border-secondary/10">
                <p className="text-dark/60 text-xs mb-1">Loan Number</p>
                <p className="font-bold text-dark text-sm">{loan.loan_number || "N/A"}</p>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 border border-primary/10">
                <p className="text-dark/60 text-xs mb-1">Loan Amount</p>
                <p className="font-bold text-primary text-sm">
                  {formatCurrency(Number(loan.loan_amount))}
                </p>
              </div>
              <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-4 border border-secondary/10">
                <p className="text-dark/60 text-xs mb-1">Loan Balance</p>
                <p className="font-bold text-dark text-sm">
                  {formatCurrency(Number(loan.loan_balance))}
                </p>
              </div>
              <div className="bg-gradient-to-br from-light/30 to-light/50 rounded-2xl p-4 border border-light/30">
                <p className="text-dark/60 text-xs mb-1">Next Due Date</p>
                <p className="font-bold text-dark text-sm">
                  {loan.next_due_date ? formatDate(loan.next_due_date) : "N/A"}
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 border border-primary/10">
                <p className="text-dark/60 text-xs mb-1">Monthly Installment</p>
                <p className="font-bold text-primary text-sm">
                  {formatCurrency(Number(loan.monthly_installment))}
                </p>
              </div>
              <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-4 border border-secondary/10">
                <p className="text-dark/60 text-xs mb-1">Interest Rate</p>
                <p className="font-bold text-dark text-sm">{loan.interest_rate || "N/A"}%</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
                <p className="text-dark/60 text-xs mb-1">Loan Status</p>
                <p className="font-bold capitalize text-green-600 text-sm">
                  {loan.loan_status || "N/A"}
                </p>
              </div>
            </div>
          </section>

          {/* Guarantors Section */}
          {guarantors && guarantors.length > 0 && (
            <section className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-2xl">👥</span>
                <h2 className="text-xl font-bold text-dark">Guarantors</h2>
              </div>
              <div className="space-y-4">
                {guarantors.map((guarantor: GuarantorLoan) => (
                  <div
                    key={guarantor.id}
                    className="bg-gradient-to-r from-light/30 to-light/50 rounded-2xl p-5 border border-light/30"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex justify-between items-center">
                        <p className="text-dark/60 text-sm">Name</p>
                        <p className="font-semibold text-dark text-sm">
                          {guarantor.user.first_name} {guarantor.user.middle_name}{" "}
                          {guarantor.user.last_name}
                        </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-dark/60 text-sm">Phone Number</p>
                        <p className="font-semibold text-dark text-sm">{guarantor.user.phone_number}</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-dark/60 text-sm">Liability Amount</p>
                        <p className="font-semibold text-primary text-sm">
                          {formatCurrency(
                            Number(guarantor.guarantor_liability_amount)
                          )}
                        </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-dark/60 text-sm">Status</p>
                        <p className="font-semibold capitalize text-dark text-sm">{guarantor.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Remarks Section */}
          {loan.remarks && (
            <section className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">💬</span>
                <h2 className="text-xl font-bold text-dark">Remarks</h2>
              </div>
              <p className="text-dark/70 italic bg-light/30 rounded-2xl p-4">
                {loan.remarks}
              </p>
            </section>
          )}

          {/* Qualifications Section */}
          {loan.qualifications && (
            <section className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-2xl">⭐</span>
                <h2 className="text-xl font-bold text-dark">Qualifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/10">
                  <p className="text-dark/60 text-sm">Total Loans</p>
                  <p className="font-bold text-primary">
                    {loan.qualifications?.total_loans || 0}
                  </p>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border border-red-200">
                  <p className="text-dark/60 text-sm">Defaults</p>
                  <p className="font-bold text-red-600">{loan.qualifications?.defaults || 0}</p>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200">
                  <p className="text-dark/60 text-sm">Successful Repayments</p>
                  <p className="font-bold text-green-600">
                    {loan.qualifications?.successfulRepayments || 0}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-2xl border border-secondary/10">
                  <p className="text-dark/60 text-sm mb-4 text-center">Credit Score</p>
                  <div className="flex justify-center">
                    <CircularProgressBar
                      completed={loan.qualifications?.credit_score || 0}
                      height="120px"
                      isLabelVisible={true}
                      labelSize="16px"
                      label="score"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Fixed Request Invoice Button at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-[90%] sm:max-w-[80%] mx-auto p-4">
          <button
            onClick={toggleShowConcentModal}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2 active:scale-95"
          >
            {loadingLoanMiniStatement ? (
              <>
                <Spinner size="sm" color="text-white" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <FaFilePdf className="text-lg" />
                <span>Request Invoice</span>
              </>
            )}
          </button>
        </div>
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
          <div className="p-6 py-10 w-[95%] mx-auto bg-white rounded-3xl">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary/10 rounded-full p-4">
                <FaFilePdf className="text-6xl text-primary" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center text-dark mb-3">
              Request Invoice
            </h3>
            <p className="text-gray-600 text-center mb-6">
              A copy of the mini statement will be sent to your email address.
              Toggle the switch below to enable this feature.
            </p>

            <div className="mb-6">
              <div className="flex justify-between items-center bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-4">
                <div>
                  <h5 className="font-semibold text-dark">Enable Email Sending</h5>
                  <p className="text-sm text-dark/60">Receive invoice via email</p>
                </div>

                <div className="flex justify-center">
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

            <UniversalButton
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary w-full text-white rounded-2xl py-3 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
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
                  <Spinner size="sm" color="text-white" />
                ) : (
                  <MdSend className="text-xl" />
                )
              }
              isCustomIcon={true}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default LoanDetailsComponent;
