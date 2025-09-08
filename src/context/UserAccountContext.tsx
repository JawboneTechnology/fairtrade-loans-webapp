import {
  useState,
  ReactNode,
  useContext,
  useEffect,
  createContext,
} from "react";
import { toast } from "sonner";
import useAuthStore from "@/store/UseAuthStore";
import useAuthQueries from "@/hooks/useAuthQueries";
import { UserProfile } from "@/types/UserTypes";
import {
  ProfileField,
  initialProfileValidationFields,
} from "@/types/AuthTypes";
import { LoanData, UserLoansData, LoanDetailsData } from "@/types/LoanTypes";
import useServerSideQueries from "@/hooks/useServerSideQueries";

interface UserAccountContextType {
  loadingUser: boolean;
  loadingAccountDelete: boolean;
  loadingProfileUpdate: boolean;
  profileDetails: UserProfile | null;
  handleRemoveProfileImage: () => void;
  profileValidationErrors: ProfileField;
  handleUpdateProfile: (fn: () => void) => void;
  handleDeleteProfile: (reason: string, fn: () => void) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setProfileDetails: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  fetchRecentLoanInformation: () => void;
  recentLoanInformation: RecentLoan | null;
  loadingRecentLoan: boolean;
  fetchLoanApplicationDetails: (loanId: string) => void;
  loanDetails: LoanDetailsData | null;
  loadingLoanApplication: boolean;
  getLoanMiniStatement: (
    loanId: string,
    toggleDrawer: () => void,
    toggleConcent: () => void,
    emailData: { send_email: boolean }
  ) => void;
  loanMiniStatement: LoanData | null;
  loadingLoanMiniStatement: boolean;
  getUserLoans: () => void;
  loans: UserLoansData | null;
  loadingLoans: boolean;
}

type RecentLoan = {
  calculations: Calculation;
};

type Calculation = {
  id: string;
  loan_number: string;
  percentage_complete: number;
  outstanding_amount: number;
  amount_paid: number;
  loan_amount: string | number;
  loan_type_name: string;
  applied_at: string;
};

export const UserAccountContext = createContext({} as UserAccountContextType);

export const UserAccountProvider = ({ children }: { children: ReactNode }) => {
  const [start, setStart] = useState<number>(0);
  const [limit, _] = useState<number>(10);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [loadingAccountDelete, setLoadingAccountDelete] =
    useState<boolean>(false);
  const [loadingProfileUpdate, setLoadingProfileUpdate] =
    useState<boolean>(false);
  const [profileDetails, setProfileDetails] = useState<UserProfile | null>(
    null
  );
  const { user, token, logout, setToken, setProfile } = useAuthStore();
  const userId = user?.id;
  const [profileValidationErrors, setProfileValidationErrors] = useState(
    initialProfileValidationFields
  );
  const [loadingRecentLoan, setLoadingRecentLoan] = useState<boolean>(false);
  const [recentLoanInformation, setRecentLoanInformation] =
    useState<RecentLoan | null>(null);
  const [loadingLoanApplication, setLoadingLoanApplication] =
    useState<boolean>(false);
  const [loanDetails, setLoanDetails] = useState<LoanDetailsData | null>(null);
  const [loadingLoanMiniStatement, setLoadingLoanMiniStatement] =
    useState<boolean>(false);
  const [loanMiniStatement, setLoanMiniStatement] = useState<LoanData | null>(
    null
  );
  const [loadingLoans, setLoadingLoans] = useState<boolean>(false);
  const [loans, setLoans] = useState<UserLoansData | null>(null);

  // Handle Update profile
  const handleUpdateProfile = (onClose: () => void) => {
    if (loadingProfileUpdate) return;

    if (!handleValidateProfileForm()) return;

    const updatedProfileData = {
      first_name: profileDetails?.first_name || "",
      middle_name: profileDetails?.middle_name || "",
      last_name: profileDetails?.last_name || "",
      address: profileDetails?.address || "",
      dob: profileDetails?.dob || "",
      passport_image: profileDetails?.passport_image || "",
      gender: profileDetails?.gender || "",
      years_of_employment: profileDetails?.years_of_employment || "",
      salary: profileDetails?.salary || "",
    };

    setLoadingProfileUpdate(true);

    useAuthQueries()
      .updateUserProfile(userId as string, updatedProfileData)
      .then((res) => {
        const { success, message, data } = res;

        if (success) {
          console.log(message);
          setProfile(data);
          setToken(data.token);
          onClose();
        } else {
          console.error(message);
          toast.error("System error. Please try again later", {
            description: message,
            duration: 5000,
          });
        }
        setLoadingProfileUpdate(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingProfileUpdate(false);
      });
  };

  // Handle Delete profile
  const handleDeleteProfile = (reason: string, onClose: () => void) => {
    if (loadingAccountDelete) return;

    setLoadingAccountDelete(true);
    useAuthQueries()
      .deleteUserProfile(reason)
      .then((res) => {
        const { success, message } = res;

        if (success) {
          setProfileDetails(null);
          logout();
          console.log(message);
          onClose();
        } else {
          console.error(message);
          toast.error("System error. Please try again later", {
            description: message,
            duration: 5000,
          });
        }

        setLoadingAccountDelete(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingAccountDelete(false);
      });
  };

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfileDetails(
      (prevDetails) =>
        ({
          ...prevDetails,
          [name]: value,
        } as UserProfile)
    );
  };

  // handle Remove Profile Image
  const handleRemoveProfileImage = () => {
    setProfileDetails((prevDetails) =>
      prevDetails ? { ...prevDetails, passport_image: "" } : prevDetails
    );
  };

  const handleValidateProfileForm = () => {
    let errors: ProfileField = { ...profileValidationErrors };

    // Validate first_name
    if (!profileDetails?.first_name) {
      errors.first_name = "First name is required";
    } else if (profileDetails?.first_name.length < 2) {
      errors.first_name = "First name must be at least 2 characters";
    } else {
      errors.first_name = "";
    }

    // Validate middle_name
    if (!profileDetails?.middle_name) {
      errors.middle_name = "Middle name is required";
    } else if (profileDetails?.middle_name.length < 2) {
      errors.middle_name = "Middle name must be at least 2 characters";
    } else {
      errors.middle_name = "";
    }

    // Validate last_name
    if (!profileDetails?.last_name) {
      errors.last_name = "Last name is required";
    } else if (profileDetails?.last_name.length < 2) {
      errors.last_name = "Last name must be at least 2 characters";
    } else {
      errors.last_name = "";
    }

    // Validate address
    if (!profileDetails?.address) {
      errors.address = "Address is required";
    } else if (profileDetails?.address.length < 5) {
      errors.address = "Address must be at least 5 characters";
    } else {
      errors.address = "";
    }

    // Validate dob (date of birth)
    if (!profileDetails?.dob) {
      errors.dob = "Date of birth is required";
    } else if (new Date(profileDetails?.dob) > new Date()) {
      errors.dob = "Date of birth cannot be in the future";
    } else {
      // Calculate age
      const dob = new Date(profileDetails?.dob);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();

      // Adjust age if the birthday hasn't occurred yet this year
      const monthDifference = today.getMonth() - dob.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }

      // Check if the user is at least 18 years old
      if (age < 18) {
        errors.dob = "You must be at least 18 years old";
      } else {
        errors.dob = "";
      }
    }

    // Validate passport_image
    if (!profileDetails?.passport_image) {
      errors.passport_image = "Passport image is required";
    } else {
      errors.passport_image = "";
    }

    // Validate gender
    if (!profileDetails?.gender) {
      errors.gender = "Gender is required";
    } else if (
      !["male", "female", "other"].includes(
        profileDetails?.gender.toLowerCase()
      )
    ) {
      errors.gender = "Gender must be male, female, or other";
    } else {
      errors.gender = "";
    }

    // Validate years_of_employment
    if (!profileDetails?.years_of_employment) {
      errors.years_of_employment = "Years of employment is required";
    } else if (isNaN(Number(profileDetails?.years_of_employment))) {
      errors.years_of_employment = "Years of employment must be a number";
    } else {
      errors.years_of_employment = "";
    }

    // Validate salary
    if (!profileDetails?.salary) {
      errors.salary = "Salary is required";
    } else if (isNaN(Number(profileDetails?.salary))) {
      errors.salary = "Salary must be a number";
    } else if (Number(profileDetails?.salary) < 0) {
      errors.salary = "Salary cannot be negative";
    } else {
      errors.salary = 0;
    }

    setProfileValidationErrors(errors);

    return Object.values(errors).every(
      (error) => error === "" || error === null || error === 0
    );
  };

  // Fetch user recent loan information
  const fetchRecentLoanInformation = () => {
    if (userId && !loadingRecentLoan) {
      setLoadingRecentLoan(true);
      useServerSideQueries()
        .getRecentLoanInformation()
        .then((res) => {
          const { success, message, data } = res;

          if (success) {
            setRecentLoanInformation(data.recent_loan);
            console.log(message);
          } else {
            console.error(message);
          }
          setLoadingRecentLoan(false);
        })
        .catch((error) => {
          console.error(error.message);
          setLoadingRecentLoan(false);
        });
    }
  };

  // Fetch user loan application status
  const fetchLoanApplicationDetails = (loanId: string) => {
    if (userId && !loadingLoanApplication) {
      setLoadingLoanApplication(true);
      useServerSideQueries()
        .getLoanDetails(loanId)
        .then((res) => {
          const { success, message, data } = res;

          if (success) {
            setLoanDetails(data);
            console.log(message);
          } else {
            console.error(message);
          }
          setLoadingLoanApplication(false);
        })
        .catch((error) => {
          console.error(error.message);
          setLoadingLoanApplication(false);
        });
    }
  };

  // Get Loan Ministatement
  const getLoanMiniStatement = (
    loanId: string,
    toggleDrawer: () => void,
    toggleConcent: () => void,
    emailData: { send_email: boolean }
  ) => {
    if (userId && !loadingLoanMiniStatement) {
      setLoadingLoanMiniStatement(true);
      useServerSideQueries()
        .getLoanMiniStatement(loanId, emailData)
        .then((res) => {
          const { success, message, data } = res;

          if (success) {
            setLoanMiniStatement(data);
            toggleDrawer();
            toggleConcent();
            console.log(message);
          } else {
            console.error(message);
          }
          setLoadingLoanMiniStatement(false);
        })
        .catch((error) => {
          console.error(error.message);
          setLoadingLoanMiniStatement(false);
        });
    }
  };

  // Get Loans
  const getUserLoans = () => {
    if (userId && !loadingLoans) {
      setLoadingLoans(true);
      useServerSideQueries()
        .getLoans(start, limit)
        .then((res) => {
          const { success, message, data } = res;

          if (success) {
            setLoans(data);
            setStart(start + limit);
            console.log(message);
          } else {
            console.error(message);
          }
          setLoadingLoans(false);
        })
        .catch((error) => {
          console.error(error.message);
          setLoadingLoans(false);
        });
    }
  };

  useEffect(() => {
    if (userId && token && !loadingUser) {
      setLoadingUser(true);
      useAuthQueries()
        .getUserProfile()
        .then((res) => {
          const { success, message, data } = res;

          if (success) {
            setProfileDetails({
              id: data?.id || "",
              email_verified_at: data?.email_verified_at || "",
              employee_id: data?.employee_id || "",
              first_name: data?.first_name || "",
              middle_name: data?.middle_name || "",
              last_name: data?.last_name || "",
              phone_number: data?.phone_number || "",
              address: data?.address || "",
              dob: data?.dob || "",
              gender: data?.gender || "",
              email: data?.email || "",
              years_of_employment: data?.years_of_employment || "",
              salary: data?.salary || "",
              passport_image: data?.passport_image || "",
              employer_id: data?.employer_id || "",
              loan_limit: data?.loan_limit || "",
              verification_code: data?.verification_code || "",
              created_at: data?.created_at || "",
              updated_at: data?.updated_at || "",
            });
            console.log(message);
          } else {
            console.error(message);
          }
          setLoadingUser(false);
        })
        .catch((error) => {
          console.error(error.message);
          setLoadingUser(false);

          setLoadingUser(false);
        });
    }
  }, [userId]);

  const values = {
    loans,
    loadingUser,
    loanDetails,
    getUserLoans,
    loadingLoans,
    profileDetails,
    loanMiniStatement,
    loadingRecentLoan,
    setProfileDetails,
    handleInputChange,
    handleUpdateProfile,
    handleDeleteProfile,
    getLoanMiniStatement,
    loadingAccountDelete,
    loadingProfileUpdate,
    recentLoanInformation,
    loadingLoanApplication,
    profileValidationErrors,
    loadingLoanMiniStatement,
    handleRemoveProfileImage,
    fetchRecentLoanInformation,
    fetchLoanApplicationDetails,
  };

  return (
    <UserAccountContext.Provider value={values}>
      {children}
    </UserAccountContext.Provider>
  );
};

export const useUserAccount = (): UserAccountContextType => {
  const context = useContext(UserAccountContext);
  if (!context) {
    throw new Error(
      "useUserAccount must be used within an UserAccountProvider"
    );
  }
  return context;
};
