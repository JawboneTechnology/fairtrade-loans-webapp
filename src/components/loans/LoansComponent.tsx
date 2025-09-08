import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useLoans } from "@/context/LoanContext";
import { MdOutlinePayments } from "react-icons/md";
import { BsExclamationCircle } from "react-icons/bs";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useUserAccount } from "@/context/UserAccountContext";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import { Spinner, UniversalButton, LoanLoadingSkeleton } from "@/components";
import { useEffect } from "react";

const LoansComponent = () => {
  const navigate = useNavigate();
  const { loans, loadingLoans } = useUserAccount();
  const { formatCurrency } = useCurrencyFormatter();
  const { fetchLoanTypes, loadingLoanTypes, LoanStatistics, fetchLoanStatistics } = useLoans();

  interface LoanStatusBadgeProps {
    status: string;
  }

  const getStatusBadge = (status: LoanStatusBadgeProps["status"]) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full capitalize";

    switch (status.toLowerCase()) {
      case "approved":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            {status}
          </span>
        );
      case "pending":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            {status}
          </span>
        );
      case "rejected":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            {status}
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            {status}
          </span>
        );
    }
  };

  useEffect(() => {
    fetchLoanStatistics();
  }, []);

  return (
    <div className="h-full p-4 md:p-6 pb-[200px] max-w-4xl mx-auto overflow-y-scroll">
      <div className="">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
          <div className="mx-3">
            <h1 className="text-2xl font-bold text-gray-800">My Loans</h1>
            <p className="text-white">Manage your loan accounts</p>
          </div>

          <button
            onClick={fetchLoanTypes}
            disabled={loadingLoanTypes}
            className="justify-center mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-secondary text-dark font-medium rounded-lg transition-colors shadow-sm mx-3"
          >
            {loadingLoanTypes ? (
              <Spinner size="sm" color="text-white" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                Loan Types
              </>
            )}
          </button>
        </div>

        {/* Stats Summary */}
        {!loadingLoans && (loans?.loans ?? []).length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-primary p-3 rounded-b-lg shadow-sm">
          {/* Total Loans */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Loans</p>
            <p className="text-lg font-bold text-gray-800">
              {LoanStatistics?.total_loans || 0}
            </p>
          </div>
        
          {/* Approved Loans */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Approved Loans</p>
            <p className="text-lg font-bold text-green-600">
              {LoanStatistics?.approved_loans || 0}
            </p>
          </div>
        
          {/* Pending Loans */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Pending Loans</p>
            <p className="text-lg font-bold text-yellow-600">
              {LoanStatistics?.pending_loans || 0}
            </p>
          </div>
        
          {/* Total Balance */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Balance</p>
            <p className="text-lg font-bold text-primary-600">
              {formatCurrency(LoanStatistics?.total_balance || 0)}
            </p>
          </div>
        
          {/* Rejected Loans */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Rejected Loans</p>
            <p className="text-lg font-bold text-red-600">
              {LoanStatistics?.rejected_loans || 0}
            </p>
          </div>
        
          {/* Total Requested */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Requested</p>
            <p className="text-lg font-bold text-blue-600">
              {formatCurrency(LoanStatistics?.total_requested || 0)}
            </p>
          </div>
        
          {/* Total Approved */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Approved</p>
            <p className="text-lg font-bold text-green-600">
              {formatCurrency(LoanStatistics?.total_approved || 0)}
            </p>
          </div>
        
          {/* Average Loan Amount */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Avg Loan Amount</p>
            <p className="text-lg font-bold text-purple-600">
              {LoanStatistics?.avg_loan_amount ? formatCurrency(LoanStatistics.avg_loan_amount) : 'N/A'}
            </p>
          </div>
        </div>
        )}

        {/* Loans List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          {loadingLoans ? (
            <LoanLoadingSkeleton />
          ) : (loans?.loans ?? []).length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {loans?.loans.map((loan) => (
                <li
                  key={loan.loan_id}
                  className="bg-white p-4 md:p-6 hover:bg-gray-50 border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Loan Summary */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Loan #{loan.loan_number}
                        </h3>
                        {getStatusBadge(loan.loan_status)}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-gray-500">Amount</p>
                          <p className="font-medium text-gray-800">
                            {formatCurrency(Number(loan.loan_amount))}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Balance</p>
                          <p className="font-medium text-gray-800">
                            {formatCurrency(Number(loan.loan_balance))}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Rate</p>
                          <p className="font-medium text-gray-800">
                            {loan.interest_rate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Term</p>
                          <p className="font-medium text-gray-800">
                            {loan.tenure_months} months
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm text-gray-500">
                              Next Payment
                            </p>
                            <p className="font-medium text-gray-800">
                              {formatCurrency(Number(loan.monthly_installment))}{" "}
                              on {loan.next_due_date}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2 w-full md:w-auto">
                      <UniversalButton
                        className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-full w-full text-sm"
                        title="View Details"
                        handleClick={() =>
                          navigate("/loan-details/" + loan.loan_id)
                        }
                        icon={<HiArrowNarrowRight className="text-lg" />}
                        isCustomIcon={true}
                      />
                      <UniversalButton
                        className="bg-secondary hover:bg-secondary-700 text-dark px-4 py-2 rounded-full w-full text-sm"
                        title="Make Payment"
                        handleClick={() =>
                          navigate("/make-payment/" + loan.loan_id)
                        }
                        icon={<MdOutlinePayments className="text-lg" />}
                        isCustomIcon={true}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center">
              <BsExclamationCircle className="h-12 w-12 mx-auto text-primary-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No active loans
              </h3>
              <p className="mt-1 text-gray-500">
                You don't have any active loans at this time.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate("/apply-loan")}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                  <FaCirclePlus className="mr-2" />
                  Apply for a Loan
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-20 right-6 z-50">
          <button
            onClick={() => navigate("/apply-loan")}
            className="bg-primary hover:bg-primary text-white p-4 rounded-full shadow-lg transition-colors flex items-center justify-center"
            aria-label="Apply for loan"
          >
            <FaCirclePlus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoansComponent;
