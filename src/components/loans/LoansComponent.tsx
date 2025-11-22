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
      "px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-bold rounded-xl sm:rounded-2xl capitalize flex items-center space-x-1 whitespace-nowrap";

    switch (status.toLowerCase()) {
      case "approved":
        return (
          <span
            className={`${baseClasses} bg-green-100 text-green-700 border border-green-200`}
          >
            <FaCheckCircle className="text-xs flex-shrink-0" />
            <span className="truncate">{status}</span>
          </span>
        );
      case "pending":
        return (
          <span
            className={`${baseClasses} bg-amber-100 text-amber-700 border border-amber-200`}
          >
            <FaClock className="text-xs flex-shrink-0" />
            <span className="truncate">{status}</span>
          </span>
        );
      case "rejected":
        return (
          <span
            className={`${baseClasses} bg-red-100 text-red-700 border border-red-200`}
          >
            <FaTimesCircle className="text-xs flex-shrink-0" />
            <span className="truncate">{status}</span>
          </span>
        );
      default:
        return (
          <span
            className={`${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`}
          >
            <span className="truncate">{status}</span>
          </span>
        );
    }
  };

  useEffect(() => {
    fetchLoanStatistics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 pb-[200px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
                <div className="bg-white/20 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-shrink-0">
                  <BsBank className="text-xl sm:text-2xl text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">My Loans</h1>
                  <p className="text-white/90 text-xs sm:text-sm truncate">
                    Track and manage your loan portfolio
                  </p>
                </div>
              </div>

              <button
                onClick={fetchLoanTypes}
                disabled={loadingLoanTypes}
                className="w-full sm:w-auto bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                {loadingLoanTypes ? (
                  <Spinner size="sm" color="text-white" />
                ) : (
                  <>
                    <FaChartLine className="text-base sm:text-lg" />
                    <span>View Loan Types</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        {!loadingLoans && (loans?.loans ?? []).length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Total Loans */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-200">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-primary/10 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-shrink-0">
                  <MdTrendingUp className="text-primary text-base sm:text-lg lg:text-xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-dark/60 truncate">
                    Total Loans
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-dark truncate">
                    {LoanStatistics?.total_loans || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Approved Loans */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-200">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-green-100 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-shrink-0">
                  <FaCheckCircle className="text-green-600 text-base sm:text-lg lg:text-xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-dark/60 truncate">Approved</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 truncate">
                    {LoanStatistics?.approved_loans || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Pending Loans */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-200">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-amber-100 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-shrink-0">
                  <FaClock className="text-amber-600 text-base sm:text-lg lg:text-xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-dark/60 truncate">Pending</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-600 truncate">
                    {LoanStatistics?.pending_loans || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Balance */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl text-white hover:shadow-2xl transition-all duration-200">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-white/20 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-shrink-0">
                  <FaCreditCard className="text-white text-base sm:text-lg lg:text-xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-white/80 truncate">
                    Total Balance
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-dark">Active Loans</h2>
                <span className="text-dark/60 text-xs sm:text-sm">
                  {loans?.loans?.length} loan
                  {loans?.loans?.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {loans?.loans.map((loan) => (
                  <div
                    key={loan.loan_id}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="space-y-4 sm:space-y-6">
                      {/* Loan Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-shrink-0">
                            <BsBank className="text-white text-base sm:text-lg lg:text-xl" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-dark truncate">
                              Loan #{loan.loan_number}
                            </h3>
                            <p className="text-dark/60 text-xs sm:text-sm truncate">
                              Personal Loan Account
                            </p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 self-start sm:self-center">
                          {getStatusBadge(loan.loan_status)}
                        </div>
                      </div>

                      {/* Loan Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <FaCreditCard className="text-primary text-xs sm:text-sm flex-shrink-0" />
                            <p className="text-xs sm:text-sm font-medium text-dark/70 truncate">
                              Loan Amount
                            </p>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-dark break-words">
                            {formatCurrency(Number(loan.loan_amount))}
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <FaCreditCard className="text-amber-600 text-xs sm:text-sm flex-shrink-0" />
                            <p className="text-xs sm:text-sm font-medium text-dark/70 truncate">
                              Outstanding
                            </p>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-amber-600 break-words">
                            {formatCurrency(Number(loan.loan_balance))}
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-secondary/10 to-secondary/20 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <MdTrendingUp className="text-dark text-xs sm:text-sm flex-shrink-0" />
                            <p className="text-xs sm:text-sm font-medium text-dark/70 truncate">
                              Interest Rate
                            </p>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-dark break-words">
                            {loan.interest_rate}%
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-light/30 to-light/50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <FaClock className="text-primary text-xs sm:text-sm flex-shrink-0" />
                            <p className="text-xs sm:text-sm font-medium text-dark/70 truncate">
                              Term
                            </p>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-primary break-words">
                            {loan.tenure_months} months
                          </p>
                        </div>
                      </div>

                      {/* Next Payment Info */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <FaClock className="text-primary text-xs sm:text-sm flex-shrink-0" />
                              <p className="text-xs sm:text-sm font-medium text-dark/70 truncate">
                                Next Payment Due
                              </p>
                            </div>
                            <p className="text-base sm:text-lg font-bold text-dark break-words">
                              {formatCurrency(Number(loan.monthly_installment))}
                            </p>
                            <p className="text-xs sm:text-sm text-dark/60 truncate">
                              Due: {loan.next_due_date}
                            </p>
                          </div>
                          <div className="flex-shrink-0 sm:text-right">
                            <p className="text-xs sm:text-sm text-dark/60 mb-1">
                              Payment Progress
                            </p>
                            <div className="w-full sm:w-24 bg-gray-200 rounded-full h-2">
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
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button
                          onClick={() =>
                            navigate("/loan-details/" + loan.loan_id)
                          }
                          className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                        >
                          <FaEye className="text-base sm:text-lg flex-shrink-0" />
                          <span className="truncate">View Details</span>
                        </button>
                        <button
                          onClick={() =>
                            navigate("/make-payment", {
                              state: {
                                loanId: loan.loan_id,
                                amount: loan.monthly_installment,
                                loanNumber: loan.loan_number,
                                nextDueDate: loan.next_due_date,
                              },
                            })
                          }
                          className="flex-1 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary hover:to-secondary text-dark font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                        >
                          <MdOutlinePayments className="text-base sm:text-lg flex-shrink-0" />
                          <span className="truncate">Make Payment</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-12 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-4 sm:mb-6">
                <BsExclamationCircle className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-primary mb-3 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-dark mb-2">
                  No Active Loans
                </h3>
                <p className="text-dark/70 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
                  Ready to take the next step? Apply for your first loan and
                  unlock new financial opportunities.
                </p>
              </div>
              <button
                onClick={() => navigate("/apply-loan")}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2 sm:space-x-3 mx-auto shadow-xl hover:shadow-2xl text-sm sm:text-base w-full sm:w-auto"
              >
                <FaCirclePlus className="text-base sm:text-lg flex-shrink-0" />
                <span className="truncate">Apply for Your First Loan</span>
              </button>
            </div>
          )}
        </div>

        {/* Floating Action Button - Only show when there are existing loans */}
        {(loans?.loans ?? []).length > 0 && (
          <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50">
            <button
              onClick={() => navigate("/apply-loan")}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-200 active:scale-95 flex items-center justify-center group"
              aria-label="Apply for another loan"
            >
              <FaCirclePlus
                size={20}
                className="sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-200"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoansComponent;
