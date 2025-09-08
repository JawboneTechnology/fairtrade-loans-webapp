import { ApplyLoanComponent } from "@/components";
import { useLoans } from "@/context/LoanContext";
import useAuthStore from "@/store/UseAuthStore";
import { useEffect } from "react";

const ApplyLoanScreen = () => {
  const { user, token } = useAuthStore();
  const {
    fetchLoanTypes,
    fetchGuarantors,
    fetchUserLoanLimit,
    setLoanApplication,
  } = useLoans();

  useEffect(() => {
    if (token && user) {
      fetchUserLoanLimit(user.id);
      fetchLoanTypes();
      fetchGuarantors();

      // Set employee ID employee_id
      setLoanApplication((prev) => ({
        ...prev,
        employee_id: user.id,
      }));
    }
  }, []);

  return <ApplyLoanComponent />;
};

export default ApplyLoanScreen;
