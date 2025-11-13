import { FloatingInput } from "@/components";
import { useLoans } from "@/context/LoanContext";
import { useEffect, useState } from "react";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

const LoanAmountPeriod = () => {
  const { loanTypes, loanLimit, setLoanApplication, loanApplication } =
    useLoans();
  const { formatCurrency } = useCurrencyFormatter();
  
  const [amount, setAmount] = useState<string>(
    loanApplication?.amount?.toString() || "20000"
  );
  const [tenureMonths, setTenureMonths] = useState<string>(
    loanApplication?.tenure_months?.toString() || "6"
  );

  const maxAmount = loanLimit?.loan_limit || 200000;
  const minAmount = 5000;
  const maxPeriod = 24;
  const minPeriod = 2;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only allow numbers
    setAmount(value);
    
    const numValue = parseInt(value) || 0;
    // Update loan application if value is within valid range or if empty (to allow clearing)
    if (value === "" || (numValue >= minAmount && numValue <= maxAmount)) {
      setLoanApplication((prev) => ({ 
        ...prev, 
        amount: value === "" ? 0 : numValue 
      }));
    }
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only allow numbers
    setTenureMonths(value);
    
    const numValue = parseInt(value) || 0;
    // Update loan application if value is within valid range or if empty (to allow clearing)
    if (value === "" || (numValue >= minPeriod && numValue <= maxPeriod)) {
      setLoanApplication((prev) => ({ 
        ...prev, 
        tenure_months: value === "" ? 0 : numValue 
      }));
    }
  };

  useEffect(() => {
    if ((loanLimit?.loan_limit ?? 0) > 0) {
      const defaultAmount = 20000;
      const defaultPeriod = 6;
      setAmount(defaultAmount.toString());
      setTenureMonths(defaultPeriod.toString());
      setLoanApplication((prev) => ({
        ...prev,
        amount: defaultAmount,
        tenure_months: defaultPeriod,
      }));
    }
  }, [loanTypes, loanLimit]);

  // Sync with loanApplication state if it changes externally
  useEffect(() => {
    if (loanApplication?.amount && loanApplication.amount.toString() !== amount) {
      setAmount(loanApplication.amount.toString());
    }
    if (loanApplication?.tenure_months && loanApplication.tenure_months.toString() !== tenureMonths) {
      setTenureMonths(loanApplication.tenure_months.toString());
    }
  }, [loanApplication?.amount, loanApplication?.tenure_months, amount, tenureMonths]);

  const amountNum = parseInt(amount) || 0;
  const amountError =
    amount && amountNum > 0 && (amountNum < minAmount || amountNum > maxAmount)
      ? `Amount must be between ${formatCurrency(minAmount)} and ${formatCurrency(maxAmount)}`
      : null;

  const periodNum = parseInt(tenureMonths) || 0;
  const periodError =
    tenureMonths &&
    periodNum > 0 &&
    (periodNum < minPeriod || periodNum > maxPeriod)
      ? `Period must be between ${minPeriod} and ${maxPeriod} months`
      : null;

  return (
    <>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-2xl">📊</span>
          <h2 className="text-xl font-bold text-dark">
            Loan Details
          </h2>
        </div>
        <p className="text-sm text-dark/60">
          Enter your loan amount and repayment period
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Loan Amount Input */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-dark mb-1">
              Loan Amount
            </h3>
            <p className="text-sm text-dark/60">
              Enter the amount you want to borrow
            </p>
          </div>
          
          <div className="relative">
            <FloatingInput
              id="loan-amount"
              label="Loan Amount (KES)"
              value={amount}
              onChange={handleAmountChange}
              type="text"
              required
              className="w-full"
              error={amountError}
            />
            {amount && !amountError && (
              <p className="text-xs text-dark/50 mt-2">
                Maximum: {formatCurrency(maxAmount)}
              </p>
            )}
          </div>
        </div>

        {/* Repayment Period Input */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-dark mb-1">
              Repayment Period
            </h3>
            <p className="text-sm text-dark/60">
              Enter the repayment period in months
            </p>
          </div>
          
          <div className="relative">
            <FloatingInput
              id="repayment-period"
              label="Repayment Period (Months)"
              value={tenureMonths}
              onChange={handlePeriodChange}
              type="text"
              required
              className="w-full"
              error={periodError}
            />
            {tenureMonths && !periodError && (
              <p className="text-xs text-dark/50 mt-2">
                Range: {minPeriod} - {maxPeriod} months
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanAmountPeriod;
