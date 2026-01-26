import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoanDetailsComponent } from "@/components";
import { useUserAccount } from "@/context/UserAccountContext";

const LoanDetailsScreen = () => {
  const location = useLocation();
  const loanId = location.pathname.split("/")[2];
  const { fetchLoanApplicationDetails } = useUserAccount();

  useEffect(() => {
    if (loanId) {
      fetchLoanApplicationDetails(loanId);
    }
  }, [loanId]);

  return (
    <LoanDetailsComponent />
  );
};

export default LoanDetailsScreen;
