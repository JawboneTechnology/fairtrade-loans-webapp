import { toast } from "sonner";
import { useState, ReactNode, useContext, createContext } from "react";
import useServerSideQueries from "@/hooks/useServerSideQueries";

interface RegisterContextProps {
  loading: boolean;
  formData: FormData;
  formErrors: FormData;
  handleRegister: (toggleModal: () => void) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormData {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  dob: Date | string;
  passport_image?: string;
  gender: string;
  email: string;
  password: string;
  years_of_employment: string;
  salary: string;
  national_id: number | string;
  old_employee_id: string;
}

const initialFormData: FormData = {
  first_name: "",
  middle_name: "",
  last_name: "",
  phone_number: "",
  address: "",
  dob: new Date(),
  passport_image: "",
  gender: "",
  email: "",
  password: "",
  years_of_employment: "",
  salary: "",
  national_id: "",
  old_employee_id: "",
};

const initialFormErrors: FormData = {
  first_name: "",
  middle_name: "",
  last_name: "",
  phone_number: "",
  address: "",
  dob: "",
  gender: "",
  email: "",
  password: "",
  years_of_employment: "",
  salary: "",
  national_id: "",
  old_employee_id: "",
};

const RegisterContext = createContext({} as RegisterContextProps);

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value as keyof FormData,
    });
  };

  // Handle register user
  const handleRegister = async (toggleModal: () => void) => {
    if (loading) return;

    if (!handleValidate())
      return toast.error("Form requires your attention!", {
        description:
          "Please enter all required fields. Fields marked with * are required.",
        duration: 5000,
      });

    setLoading(true);

    const { success, message } = await useServerSideQueries().registerUser(
      formData
    );

    if (!success) {
      toast.error(message);
      setLoading(false);
      return;
    }

    toggleModal();
    setLoading(false);
    toast.success(message);
    setFormData(initialFormData);
  };

  // Handle validate errors
  const handleValidate = () => {
    const errors: FormData = { ...initialFormErrors };

    if (!formData.first_name) {
      errors.first_name = "First name is required";
    } else if (formData.first_name.length < 3) {
      errors.first_name = "First name must be at least 3 characters long";
    } else {
      errors.first_name = "";
    }

    if (!formData.middle_name) {
      errors.middle_name = "Middle name is required";
    } else if (formData.middle_name.length < 3) {
      errors.middle_name = "Middle name must be at least 3 characters long";
    } else {
      errors.middle_name = "";
    }

    if (!formData.last_name) {
      errors.last_name = "Last name is required";
    } else if (formData.last_name.length < 3) {
      errors.last_name = "Last name must be at least 3 characters long";
    } else {
      errors.last_name = "";
    }

    if (!formData.phone_number) {
      errors.phone_number = "Phone number is required";
    } else if (formData.phone_number.length < 10) {
      errors.phone_number = "Phone number must be at least 10 characters long";
    } else {
      errors.phone_number = "";
    }

    if (!formData.address) {
      errors.address = "Address is required";
    } else if (formData.address.length < 3) {
      errors.address = "Address must be at least 3 characters long";
    } else {
      errors.address = "";
    }

    if (!formData.dob) {
      errors.dob = "Date of birth is required";
    } else {
      errors.dob = "";
    }

    if (
      !formData.gender &&
      formData.gender !== "male" &&
      formData.gender !== "female" &&
      formData.gender !== "other"
    ) {
      errors.gender = "Please select a gender";
    } else {
      errors.gender = "";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    } else {
      errors.email = "";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else {
      errors.password = "";
    }

    if (!formData.years_of_employment) {
      errors.years_of_employment = "Years of employment is required";
    } else {
      errors.years_of_employment = "";
    }

    if (!formData.salary) {
      errors.salary = "Salary is required";
    } else {
      errors.salary = "";
    }

    if (!formData.national_id) {
      errors.national_id = "National ID is required";
    } else {
      errors.national_id = "";
    }

    if (!formData.old_employee_id) {
      errors.old_employee_id = "Old Employee ID is required";
    } else {
      errors.old_employee_id = "";
    }

    setFormErrors(errors);

    return Object.values(errors).every((err) => err === "");
  };

  const values = {
    loading,
    formData,
    formErrors,
    setFormData,
    handleChange,
    handleRegister,
  };

  return (
    <RegisterContext.Provider value={values}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = (): RegisterContextProps => {
  const context = useContext(RegisterContext);

  if (!context) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return context;
};
