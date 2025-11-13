import { useLoans } from "@/context/LoanContext";
import { FaCircleCheck } from "react-icons/fa6";

const LoanTypes = () => {
  const { loanTypes, loanApplication, setLoanApplication, setSelectedLoanType } = useLoans();

  const handleLoanTypeChange = (id: number, interest: string) => {
    setLoanApplication((prev) => ({
      ...prev,
      loan_type_id: id,
      interest_rate: Number(interest),
    }));

    const loanType = loanTypes.find((loan) => loan.id === id);
    if (loanType) {
      setSelectedLoanType(loanType);
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-2xl">💰</span>
          <h2 className="text-xl font-bold text-dark">
            Select Loan Type
          </h2>
        </div>
        <p className="text-sm text-dark/60 mb-4">
          Choose the type of loan that best fits your needs
        </p>
        <div className="space-y-3">
          {loanTypes.map((loan) => (
            <label
              key={loan.id}
              className={`flex items-center gap-4 cursor-pointer border-2 rounded-2xl p-4 transition-all duration-200 transform hover:scale-[1.02] ${
                loanApplication?.loan_type_id === loan.id
                  ? "bg-gradient-to-r from-primary/10 to-primary/5 border-primary shadow-md"
                  : "border-gray-200 hover:border-primary/30 bg-white"
              }`}
            >
              <input
                type="radio"
                name="loanType"
                checked={loanApplication?.loan_type_id === loan.id}
                onChange={() =>
                  handleLoanTypeChange(loan.id, loan.interest_rate)
                }
                className="hidden"
              />
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  loanApplication?.loan_type_id === loan.id
                    ? "bg-primary"
                    : "bg-gray-200 border-2 border-gray-300"
                }`}
              >
                {loanApplication?.loan_type_id === loan.id && (
                  <FaCircleCheck className="text-white text-sm" />
                )}
              </div>
              <span className={`font-semibold flex-1 ${
                loanApplication?.loan_type_id === loan.id
                  ? "text-primary"
                  : "text-dark"
              }`}>
                {loan.name}
              </span>
              {loanApplication?.loan_type_id === loan.id && (
                <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-medium">
                  Selected
                </span>
              )}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default LoanTypes;
