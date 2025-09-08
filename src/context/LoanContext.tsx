import { toast } from "sonner";
import useAuthStore from "@/store/UseAuthStore";
import useLoanQueries from "@/hooks/useLoanQueries";
import { useState, ReactNode, useContext, createContext } from "react";

interface LoanContextProps {
  start: number;
  limit: number;
  loanTypes: LoanType[];
  guarantors: Guarantor[];
  loadingLoanTypes: boolean;
  loadingLoanApply: boolean;
  fetchLoanTypes: () => void;
  showLoanTypeDrawer: boolean;
  loanLimit: LoanLimit | null;
  fetchGuarantors: () => void;
  loanApplication: LoanApplication;
  clearLoanApplication: () => void;
  toggleShowLoanTypeDrawer: () => void;
  fetchUserLoanLimit: (userId: string) => void;
  setStart: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setGuarantors: React.Dispatch<React.SetStateAction<Guarantor[]>>;
  applyLoan: (toggleClose: () => void, toggleOpen: () => void) => void;
  setLoanApplication: React.Dispatch<React.SetStateAction<LoanApplication>>;
  setSelectedLoanType: React.Dispatch<React.SetStateAction<LoanType | null>>;
  selectedLoanType: LoanType | null;
  LoanStatistics: LoanStatistics;
  fetchLoanStatistics: () => void;
}

type GuarantorQualifications = {
  min_credit_score: number;
  employment_years: number;
};

type LoanType = {
  id: number;
  name: string;
  interest_rate: string;
  approval_type: string;
  requires_guarantors: boolean;
  guarantor_qualifications?: GuarantorQualifications;
  status: string;
  type: string;
  required_guarantors_count?: string;
  payment_type: string;
  created_at: string;
  updated_at: string;
};

export interface Guarantor {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  employee_id: string;
}

export type LoanStatistics = {
  total_loans: number;
  approved_loans: number;
  pending_loans: number;
  rejected_loans: number;
  total_requested: number;
  total_approved: number;
  total_balance: number;
  avg_loan_amount: number | null;
};

export interface LoanApplication {
  employee_id: string;
  loan_type_id: number;
  amount: number;
  interest_rate: number;
  tenure_months: number;
  guarantors: string[];
}

const initialLoanApplicationData: LoanApplication = {
  employee_id: "",
  loan_type_id: 0,
  amount: 0,
  interest_rate: 0,
  tenure_months: 0,
  guarantors: [],
};

export interface LoanLimit {
  loan_limit: number;
}

export const LoanContext = createContext({} as LoanContextProps);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const { token, user } = useAuthStore();
  const [start, setStart] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  const [LoanStatistics, setLoanStatistics] = useState({} as LoanStatistics);
  const [loadingLoanApply, setLoadingLoanApply] = useState<boolean>(false);
  const [loadingGuarantors, setLoadingGuarantors] = useState<boolean>(false);
  const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);
  const [showLoanTypeDrawer, setShowLoanTypeDrawer] = useState<boolean>(false);
  const toggleShowLoanTypeDrawer = () => setShowLoanTypeDrawer((prev) => !prev);
  const [loadingLoanTypes, setLoadingLoanTypes] = useState<boolean>(false);
  const [loanApplication, setLoanApplication] = useState<LoanApplication>(
    initialLoanApplicationData
  );
  const [loanLimit, setLoanLimit] = useState<LoanLimit | null>(null);
  const [guarantors, setGuarantors] = useState<Guarantor[]>([]);
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType | null>(
    null
  );

  // Handle fetch loan types
  const fetchLoanTypes = async () => {
    if (loadingLoanTypes) return;
    setLoadingLoanTypes(true);
    const { success, message, data } = await useLoanQueries().getLoanTypes();

    if (!success) {
      console.error(message);
      setLoadingLoanTypes(false);
      return;
    }

    setLoanTypes(data);
    setLoadingLoanTypes(false);
    toggleShowLoanTypeDrawer();
  };

  // Handle fetch user loan limit
  const fetchUserLoanLimit = async (userId: string) => {
    const { success, message, data } = await useLoanQueries().getUserLoanLimit(
      userId
    );

    if (!success) {
      console.error(message);
      return;
    }

    console.log(message);
    setLoanLimit(data);
  };

  // Handle fetch guarantors
  const fetchGuarantors = async () => {
    if (loadingGuarantors) return;
    setLoadingGuarantors(true);

    // Fetch guarantors
    const { success, message, data } = await useLoanQueries().getGuarantors(
      start.toString(),
      limit.toString()
    );

    if (!success) {
      console.error(message);
      setLoadingGuarantors(false);
      return;
    }

    console.log(message);
    setGuarantors(data);
    setStart(start + limit);
    setLoadingGuarantors(false);
  };

  // Handle Apply Loan
  const applyLoan = async (toggleClose: () => void, toggleOpen: () => void) => {
    if (loadingLoanApply) return;

    if (!token || !user) {
      console.error("User not authenticated");
      return;
    }

    if (!validateLoanApplication(loanApplication)) {
      toast.error("Invalid loan application data", {
        description:
          "Please make sure you provide all required data for the loan application.",
        duration: 5000,
      });
      return;
    }

    setLoadingLoanApply(true);

    const { success, message } = await useLoanQueries().applyLoan(
      user?.id,
      loanApplication
    );

    if (!success) {
      setLoadingLoanApply(false);
      console.error(message);
      toast.error("Application Error!", {
        description: message,
        duration: 5000,
      });
      return;
    }

    console.log(message);
    toggleClose();
    toggleOpen();
    setLoadingLoanApply(false);
    clearLoanApplication();
  };

  // handle validate loan application
  const validateLoanApplication = (loanApplication: LoanApplication) => {
    const {
      employee_id,
      loan_type_id,
      amount,
      interest_rate,
      tenure_months,
      guarantors,
    } = loanApplication;

    if (
      !employee_id ||
      !loan_type_id ||
      !amount ||
      !interest_rate ||
      !tenure_months
    ) {
      return false;
    }

    if (guarantors.length < 1 && selectedLoanType?.requires_guarantors) {
      return false;
    }

    return true;
  };

  // handle clear loan application
  const clearLoanApplication = () => {
    setLoanApplication(initialLoanApplicationData);
  };

  // Fetch loan statistics
  const fetchLoanStatistics = async () => {
    if (loading) return;
    setLoading(true);

    const { success, message, data } =
      await useLoanQueries().getLoanStatistics();

    if (!success) {
      console.error(message);
      setLoading(false);
      return;
    }

    console.log(message);
    setLoanStatistics(data);
    setLoading(false);
  };

  const values = {
    start,
    limit,
    setStart,
    setLimit,
    applyLoan,
    loanLimit,
    loanTypes,
    guarantors,
    setGuarantors,
    fetchLoanTypes,
    LoanStatistics,
    fetchGuarantors,
    loanApplication,
    selectedLoanType,
    loadingLoanApply,
    loadingLoanTypes,
    fetchUserLoanLimit,
    setLoanApplication,
    showLoanTypeDrawer,
    fetchLoanStatistics,
    setSelectedLoanType,
    clearLoanApplication,
    toggleShowLoanTypeDrawer,
  };

  return <LoanContext.Provider value={values}>{children}</LoanContext.Provider>;
};

export const useLoans = (): LoanContextProps => {
  const context = useContext(LoanContext);

  if (!context) {
    throw new Error("useLoans must be used within a LoanProvider");
  }
  return context;
};
