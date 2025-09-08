import { useEffect } from "react";
import { WebsiteWrapper } from "@/screens";
import { useLoans } from "@/context/LoanContext";
import { useUserAccount } from "@/context/UserAccountContext";
import { BottomDrawer, LoansComponent, LoanTypeDetails } from "@/components";

const LoansScreen = () => {
  const { getUserLoans } = useUserAccount();
  const { showLoanTypeDrawer, toggleShowLoanTypeDrawer } = useLoans();

  useEffect(() => {
    getUserLoans();
  }, []);
  return (
    <>
      <WebsiteWrapper>
        <LoansComponent />
      </WebsiteWrapper>

      <BottomDrawer
        isOpen={showLoanTypeDrawer}
        onClose={toggleShowLoanTypeDrawer}
        drawerHeight="100%"
      >
        <LoanTypeDetails />
      </BottomDrawer>
    </>
  );
};

export default LoansScreen;
