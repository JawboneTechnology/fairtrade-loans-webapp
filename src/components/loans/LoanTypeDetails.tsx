import { useState } from "react";
import { useLoans } from "@/context/LoanContext";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

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

  return (
    <div className="w-full bg-gray-50">
      <h2 className="text-xl font-bold text-gray-800 bg-white p-5 border-b">
        Loan Types
      </h2>

      <div className="h-[calc(100vh-60px)] overflow-y-scroll pb-20 p-5">
        <div className="max-w-xl mx-auto relative">
          {/* Loading State */}
          {loadingLoanTypes ? (
            <p className="text-center text-gray-600">Loading loan details...</p>
          ) : (
            <div className="">
              {loanTypes.length === 0 ? (
                <p className="text-gray-600">No loan types available.</p>
              ) : (
                loanTypes.map((loanType, index) => (
                  <div
                    key={loanType.id}
                    className="mb-3 border bg-white rounded-lg p-5"
                  >
                    {/* Loan Type Name */}
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleShowDetails(loanType.id)}
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {index + 1}. {loanType.name}
                      </h3>

                      <button className="text-primary">
                        {expandedLoans[loanType.id] ? (
                          <FiChevronUp className="text-2xl" />
                        ) : (
                          <FiChevronDown className="text-2xl" />
                        )}
                      </button>
                    </div>

                    {/* Loan Type Details - Display in a Table */}
                    {expandedLoans[loanType.id] && (
                      <div className="mt-5 overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <tbody>
                            <tr>
                              <td className="border px-4 py-2 font-medium bg-primary/50">
                                Interest Rate
                              </td>
                              <td className="border px-4 py-2">
                                {loanType.interest_rate}%
                              </td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2 font-medium bg-primary/50">
                                Approval Type
                              </td>
                              <td className="border px-4 py-2">
                                {loanType.approval_type}
                              </td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2 font-medium bg-primary/50">
                                Status
                              </td>
                              <td className="border px-4 py-2">
                                {loanType.status === "active" ? (
                                  <span className="text-green-600">Active</span>
                                ) : (
                                  <span className="text-red-600">Inactive</span>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2 font-medium bg-primary/50">
                                Payment Type
                              </td>
                              <td className="border px-4 py-2">
                                {loanType.payment_type.replace("_", " ")}
                              </td>
                            </tr>
                            {loanType.requires_guarantors && (
                              <>
                                <tr>
                                  <td className="border px-4 py-2 font-medium bg-primary/50">
                                    Required Guarantors
                                  </td>
                                  <td className="border px-4 py-2">
                                    {loanType.required_guarantors_count}
                                  </td>
                                </tr>
                                {loanType.guarantor_qualifications && (
                                  <>
                                    <tr>
                                      <td className="border px-4 py-2 font-medium bg-primary/50">
                                        Min Credit Score
                                      </td>
                                      <td className="border px-4 py-2">
                                        {
                                          loanType.guarantor_qualifications
                                            .min_credit_score
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border px-4 py-2 font-medium bg-primary/50">
                                        Employment Years
                                      </td>
                                      <td className="border px-4 py-2">
                                        {
                                          loanType.guarantor_qualifications
                                            .employment_years
                                        }
                                      </td>
                                    </tr>
                                  </>
                                )}
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanTypeDetails;
