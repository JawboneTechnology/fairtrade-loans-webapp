
import { useEffect } from "react";
import { useLoans } from "@/context/LoanContext";
import { useUserAccount } from "@/context/UserAccountContext";
import { BottomDrawer, RightDrawer, LoansComponent, LoanTypeDetails } from "@/components";
import useScreenSize from "@/hooks/useScreenSize";

const LoansScreen = () => {

  const { getUserLoans } = useUserAccount();
  const { showLoanTypeDrawer, toggleShowLoanTypeDrawer } = useLoans();
  const { isDesktop } = useScreenSize();

  useEffect(() => {
    getUserLoans();
  }, []);
  return (
    <>
      <LoansComponent />

      {isDesktop ? (
        <RightDrawer
          isOpen={showLoanTypeDrawer}
          onClose={toggleShowLoanTypeDrawer}
          drawerWidth="600px"
        >
          <LoanTypeDetails />
        </RightDrawer>
      ) : (
        <BottomDrawer
          isOpen={showLoanTypeDrawer}
          onClose={toggleShowLoanTypeDrawer}
          drawerHeight="100%"
        >
          <LoanTypeDetails />
        </BottomDrawer>
      )}
    </>
  );
};

export default LoansScreen;
