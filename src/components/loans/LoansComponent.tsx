import { FaCirclePlus } from "react-icons/fa6";
import {
  FaEye,
  FaCreditCard,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLoans } from "@/context/LoanContext";
import { MdOutlinePayments, MdTrendingUp } from "react-icons/md";
import { BsExclamationCircle, BsBank } from "react-icons/bs";
import { useUserAccount } from "@/context/UserAccountContext";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import { Spinner, LoanLoadingSkeleton } from "@/components";
import { useEffect } from "react";

const LoansComponent = () => {
  const navigate = useNavigate();
  const { loans, loadingLoans } = useUserAccount();
  const { formatCurrency } = useCurrencyFormatter();
  const {
    fetchLoanTypes,
    loadingLoanTypes,
    LoanStatistics,
    fetchLoanStatistics,
  } = useLoans();

  interface LoanStatusBadgeProps {
    status: string;
  }

  const getStatusBadge = (status: LoanStatusBadgeProps["status"]) => {
    const baseClasses =
      "px-3 py-1.5 text-xs font-bold rounded-2xl capitalize flex items-center space-x-1";

    switch (status.toLowerCase()) {
      case "approved":
        return (
          <span
            className={`${baseClasses} bg-green-100 text-green-700 border border-green-200`}
          >
            <FaCheckCircle className="text-xs" />
            <span>{status}</span>
          </span>
        );
      case "pending":
        return (
          <span
            className={`${baseClasses} bg-amber-100 text-amber-700 border border-amber-200`}
          >
            <FaClock className="text-xs" />
            <span>{status}</span>
          </span>
        );
      case "rejected":
        return (
          <span
            className={`${baseClasses} bg-red-100 text-red-700 border border-red-200`}
          >
            <FaTimesCircle className="text-xs" />
            <span>{status}</span>
          </span>
        );
      default:
        return (
          <span
            className={`${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`}
          >
            <span>{status}</span>
          </span>
        );
    }
  };

  useEffect(() => {
    fetchLoanStatistics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 pb-[200px]">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white/20 rounded-2xl p-3">
                  <BsBank className="text-2xl text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">My Loans</h1>
                  <p className="text-white/90">
                    Track and manage your loan portfolio
                  </p>
                </div>
              </div>

              <button
                onClick={fetchLoanTypes}
                disabled={loadingLoanTypes}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-2"
              >
                {loadingLoanTypes ? (
                  <Spinner size="sm" color="text-white" />
                ) : (
                  <>
                    <FaChartLine className="text-lg" />
                    <span>View Loan Types</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        {!loadingLoans && (loans?.loans ?? []).length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Loans */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-2xl p-3">
                  <MdTrendingUp className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-dark/60">
                    Total Loans
                  </p>
                  <p className="text-2xl font-bold text-dark">
                    {LoanStatistics?.total_loans || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Approved Loans */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 rounded-2xl p-3">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-dark/60">Approved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {LoanStatistics?.approved_loans || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Pending Loans */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-100 rounded-2xl p-3">
                  <FaClock className="text-amber-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-dark/60">Pending</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {LoanStatistics?.pending_loans || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Balance */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 shadow-xl text-white hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-2xl p-3">
                  <FaCreditCard className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/80">
                    Total Balance
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(LoanStatistics?.total_balance || 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loans List */}
        <div className="space-y-4">
          {loadingLoans ? (
            <LoanLoadingSkeleton />
          ) : (loans?.loans ?? []).length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-dark">Active Loans</h2>
                <span className="text-dark/60 text-sm">
                  {loans?.loans?.length} loan
                  {loans?.loans?.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="space-y-6">
                {loans?.loans.map((loan) => (
                  <div
                    key={loan.loan_id}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <div className="space-y-6">
                      {/* Loan Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-3">
                            <BsBank className="text-white text-xl" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-dark">
                              Loan #{loan.loan_number}
                            </h3>
                            <p className="text-dark/60 text-sm">
                              Personal Loan Account
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(loan.loan_status)}
                      </div>

                      {/* Loan Details Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <FaCreditCard className="text-primary text-sm" />
                            <p className="text-sm font-medium text-dark/70">
                              Loan Amount
                            </p>
                          </div>
                          <p className="text-lg font-bold text-dark">
                            {formatCurrency(Number(loan.loan_amount))}
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <FaCreditCard className="text-amber-600 text-sm" />
                            <p className="text-sm font-medium text-dark/70">
                              Outstanding
                            </p>
                          </div>
                          <p className="text-lg font-bold text-amber-600">
                            {formatCurrency(Number(loan.loan_balance))}
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-secondary/10 to-secondary/20 rounded-2xl p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <MdTrendingUp className="text-dark text-sm" />
                            <p className="text-sm font-medium text-dark/70">
                              Interest Rate
                            </p>
                          </div>
                          <p className="text-lg font-bold text-dark">
                            {loan.interest_rate}%
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-light/30 to-light/50 rounded-2xl p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <FaClock className="text-primary text-sm" />
                            <p className="text-sm font-medium text-dark/70">
                              Term
                            </p>
                          </div>
                          <p className="text-lg font-bold text-primary">
                            {loan.tenure_months} months
                          </p>
                        </div>
                      </div>

                      {/* Next Payment Info */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <FaClock className="text-primary text-sm" />
                              <p className="text-sm font-medium text-dark/70">
                                Next Payment Due
                              </p>
                            </div>
                            <p className="text-lg font-bold text-dark">
                              {formatCurrency(Number(loan.monthly_installment))}
                            </p>
                            <p className="text-sm text-dark/60">
                              Due: {loan.next_due_date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-dark/60 mb-1">
                              Payment Progress
                            </p>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                                style={{
                                  width: `${Math.max(
                                    10,
                                    Math.min(
                                      90,
                                      ((Number(loan.loan_amount) -
                                        Number(loan.loan_balance)) /
                                        Number(loan.loan_amount)) *
                                        100
                                    )
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() =>
                            navigate("/loan-details/" + loan.loan_id)
                          }
                          className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                        >
                          <FaEye className="text-lg" />
                          <span>View Details</span>
                        </button>
                        <button
                          onClick={() =>
                            navigate("/make-payment/" + loan.loan_id)
                          }
                          className="flex-1 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary hover:to-secondary text-dark font-semibold py-3 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                        >
                          <MdOutlinePayments className="text-lg" />
                          <span>Make Payment</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 mb-6">
                <BsExclamationCircle className="h-16 w-16 mx-auto text-primary mb-4" />
                <h3 className="text-2xl font-bold text-dark mb-2">
                  No Active Loans
                </h3>
                <p className="text-dark/70 text-lg leading-relaxed">
                  Ready to take the next step? Apply for your first loan and
                  unlock new financial opportunities.
                </p>
              </div>
              <button
                onClick={() => navigate("/apply-loan")}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 mx-auto shadow-xl hover:shadow-2xl"
              >
                <FaCirclePlus className="text-lg" />
                <span>Apply for Your First Loan</span>
              </button>
            </div>
          )}
        </div>

        {/* Floating Action Button - Only show when there are existing loans */}
        {(loans?.loans ?? []).length > 0 && (
          <div className="fixed bottom-24 right-6 z-50">
            <button
              onClick={() => navigate("/apply-loan")}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-white p-4 rounded-2xl shadow-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center group"
              aria-label="Apply for another loan"
            >
              <FaCirclePlus
                size={24}
                className="group-hover:rotate-90 transition-transform duration-200"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoansComponent;
