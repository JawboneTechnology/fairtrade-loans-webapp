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
      <div className="mt-5 mb-10">
        <h3 className="text-lg font-medium mb-2 text-gray-800">
          Select loan type
        </h3>
        <div className="space-y-3">
          {loanTypes.map((loan) => (
            <label
              key={loan.id}
              className={`flex items-center gap-2 cursor-pointer border rounded-xl p-4 ${
                loanApplication?.loan_type_id === loan.id
                  ? "bg-light border-primary"
                  : "border-gray-400"
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
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center`}
              >
                <FaCircleCheck
                  className={`${
                    loanApplication?.loan_type_id === loan.id
                      ? "text-primary"
                      : "text-gray-300"
                  } text-2xl`}
                />
              </span>
              <span className="text-gray-800">{loan.name}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default LoanTypes;
