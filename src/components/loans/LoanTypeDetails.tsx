import { useState } from "react";
import { useLoans } from "@/context/LoanContext";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { FaFileInvoiceDollar, FaPercent, FaCheckCircle, FaTimesCircle, FaUserShield, FaCreditCard, FaBriefcase } from "react-icons/fa";
import { Spinner } from "@/components";

const LoanTypeDetails = () => {
  const { loanTypes, loadingLoanTypes } = useLoans();
  const [expandedLoans, setExpandedLoans] = useState<Record<number, boolean>>(
    {}
  );

  const toggleShowDetails = (id: number) => {
    setExpandedLoans((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatPaymentType = (paymentType: string): string => {
    return paymentType.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatApprovalType = (approvalType: string): string => {
    return approvalType.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col overflow-hidden pb-20">
      {/* Header Section with Gradient Background */}
      <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 pb-8 pt-16 px-4 rounded-b-3xl shadow-xl flex-shrink-0">
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-secondary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 bg-light/10 rounded-full blur-lg"></div>

        {/* Header Content */}
        <div className="relative z-10 text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
              <FaFileInvoiceDollar className="text-3xl text-white" />
            </div>
          </div>
          <h1 className="text-white font-bold text-2xl sm:text-3xl mb-2">
            Loan Types
          </h1>
          <p className="text-white/80 text-sm">
            Explore available loan options and their details
          </p>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 -mt-4 relative z-10 pb-6">
        <div className="max-w-2xl mx-auto">
          {/* Loading State */}
          {loadingLoanTypes ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
              <Spinner size="lg" />
              <p className="text-dark/60 mt-4">Loading loan details...</p>
            </div>
          ) : loanTypes.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <FaFileInvoiceDollar className="text-5xl text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">
                No loan types available
              </h3>
              <p className="text-dark/60">
                There are currently no loan types available.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {loanTypes.map((loanType, index) => (
                <div
                  key={loanType.id}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-200"
                >
                  {/* Loan Type Header - Clickable */}
                  <div
                    className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50/50 transition-colors duration-200"
                    onClick={() => toggleShowDetails(loanType.id)}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3 border border-primary/20">
                        <span className="text-primary font-bold text-lg">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-dark">
                          {loanType.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {loanType.status === "active" ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                              <FaCheckCircle className="mr-1" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                              <FaTimesCircle className="mr-1" />
                              Inactive
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button className="text-primary hover:text-primary/80 transition-colors duration-200 ml-4">
                      {expandedLoans[loanType.id] ? (
                        <FiChevronUp className="text-2xl" />
                      ) : (
                        <FiChevronDown className="text-2xl" />
                      )}
                    </button>
                  </div>

                  {/* Loan Type Details - Modern Card Layout */}
                  {expandedLoans[loanType.id] && (
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {/* Interest Rate */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-200">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="bg-blue-500/20 rounded-lg p-2">
                              <FaPercent className="text-blue-600" />
                            </div>
                            <div>
                              <p className="text-xs text-dark/60 font-medium">Interest Rate</p>
                              <p className="text-lg font-bold text-dark">
                                {loanType.interest_rate}%
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Approval Type */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-4 border border-purple-200">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="bg-purple-500/20 rounded-lg p-2">
                              <FaCheckCircle className="text-purple-600" />
                            </div>
                            <div>
                              <p className="text-xs text-dark/60 font-medium">Approval Type</p>
                              <p className="text-lg font-bold text-dark capitalize">
                                {formatApprovalType(loanType.approval_type)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Payment Type */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-4 border border-green-200">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="bg-green-500/20 rounded-lg p-2">
                              <FaCreditCard className="text-green-600" />
                            </div>
                            <div>
                              <p className="text-xs text-dark/60 font-medium">Payment Type</p>
                              <p className="text-lg font-bold text-dark">
                                {formatPaymentType(loanType.payment_type)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Guarantors Section */}
                        {loanType.requires_guarantors && (
                          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-4 border border-orange-200">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="bg-orange-500/20 rounded-lg p-2">
                                <FaUserShield className="text-orange-600" />
                              </div>
                              <div>
                                <p className="text-xs text-dark/60 font-medium">Required Guarantors</p>
                                <p className="text-lg font-bold text-dark">
                                  {loanType.required_guarantors_count}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Guarantor Qualifications */}
                      {loanType.requires_guarantors && loanType.guarantor_qualifications && (
                        <div className="mt-4 bg-gray-50 rounded-2xl p-5 border border-gray-200">
                          <h4 className="text-sm font-bold text-dark mb-4 flex items-center">
                            <FaUserShield className="mr-2 text-primary" />
                            Guarantor Qualifications
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-4 border border-gray-200">
                              <div className="flex items-center space-x-2 mb-2">
                                <FaCreditCard className="text-primary text-sm" />
                                <p className="text-xs text-dark/60 font-medium">Min Credit Score</p>
                              </div>
                              <p className="text-lg font-bold text-dark">
                                {loanType.guarantor_qualifications.min_credit_score}
                              </p>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-gray-200">
                              <div className="flex items-center space-x-2 mb-2">
                                <FaBriefcase className="text-primary text-sm" />
                                <p className="text-xs text-dark/60 font-medium">Employment Years</p>
                              </div>
                              <p className="text-lg font-bold text-dark">
                                {loanType.guarantor_qualifications.employment_years} years
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanTypeDetails;
