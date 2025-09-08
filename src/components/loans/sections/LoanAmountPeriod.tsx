import { RangeSlider } from "@/components";
import { useLoans } from "@/context/LoanContext";
import { useEffect } from "react";

const LoanAmountPeriod = () => {
  const { loanTypes, loanLimit, setLoanApplication } =
    useLoans();

  const handleAmountSliderChange = (value: number) => {
    setLoanApplication((prev) => ({ ...prev, amount: value }));
  };

  const handlePeriodSliderChange = (value: number) => {
    setLoanApplication((prev) => ({ ...prev, tenure_months: value }));
  };

  useEffect(() => {
    if ((loanLimit?.loan_limit ?? 0) > 0) {
      setLoanApplication((prev) => ({
        ...prev,
        amount: 20000,
        tenure_months: 6,
      }));
    }
  }, [loanTypes]);

  return (
    <>
      <div className="bg-light rounded-lg p-6 mt-5">
        <RangeSlider
          title="Choose Amount"
          descriptions="Move the slider to select the amount"
          onChange={handleAmountSliderChange}
          defaultValue={20000}
          max={loanLimit?.loan_limit || 200000}
          label="KES"
          step={1}
        />
      </div>

      <div className="bg-light rounded-lg p-6 mt-5">
        <RangeSlider
          title="Choose Repayment Period"
          descriptions="Move the slider to select the period"
          onChange={handlePeriodSliderChange}
          defaultValue={6}
          max={24}
          step={1}
          min={2}
          label2="Months"
        />
      </div>
    </>
  );
};

export default LoanAmountPeriod;
