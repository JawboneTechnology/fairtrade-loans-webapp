import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import query from "@/hooks/useDependentQueries";
import useAuthStore from "@/store/UseAuthStore";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Dependent {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  gender: string;
  date_of_birth: string;
  relationship: string;
  created_at?: string;
  updated_at?: string;
}

export interface DependentContextType {
  loading: boolean;
  dependents: Dependent[];
  addDependent: (dependent: Dependent) => Promise<void>;
  errors: { [key: string]: string | null };
  validateForm: (formData: Dependent) => boolean;
  isSubmitting: boolean;
  relationships: { value: string; label: string }[];
  genders: { value: string; label: string }[];
  calculateMaxDate: () => string;
  fetchUserDependents: () => Promise<void>;
  userDependents: Dependent[];
  setUserDependents: React.Dispatch<React.SetStateAction<Dependent[]>>;
}

const DependentContext = createContext({} as DependentContextType);

export const DependentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuthStore();
  const [userDependents, setUserDependents] = useState<Dependent[]>([]);
  const [loading, setLoading] = useState(false);
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const relationships = [
    { value: "child", label: "Child" },
    { value: "spouse", label: "Spouse" },
    { value: "parent", label: "Parent" },
    { value: "sibling", label: "Sibling" },
    { value: "other", label: "Other" },
  ];

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const validateForm = (formData: Dependent) => {
    const newErrors = {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      gender: "",
      date_of_birth: "",
      relationship: "",
    };

    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.date_of_birth)
      newErrors.date_of_birth = "Date of birth is required";
    if (!formData.relationship)
      newErrors.relationship = "Relationship is required";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const addDependent = async (dependent: Dependent): Promise<void> => {
    if (!validateForm(dependent) && loading) return;

    setIsSubmitting(true);
    setLoading(true);

    try {
      // Generate a temporary ID for local state management
      const tempDependent = { ...dependent, id: `temp-${Date.now()}` };

      setDependents((prev) => [...prev, tempDependent]);

      const requestBody = {
        user_id: user?.id as string,
        dependants: [tempDependent],
      };

      const response = await query().createUserDependent(requestBody);

      if (response.success) {
        toast.success("Dependent created successfully!", {
          description: response.message,
          duration: 5000,
        });

        const createdDependent = await response.data;
        setDependents((prev) =>
          prev.map((dep) =>
            dep.id === tempDependent.id ? createdDependent : dep
          )
        );

        navigate("/dependent", { state: { success: true } });
      }
    } catch (error: any) {
      console.error("Error creating dependent:", error);
      // Rollback optimistic update
      setDependents((prev) =>
        prev.filter((dep) => dep.id !== `temp-${Date.now()}`)
      );
      toast.error("Failed to create dependent!", {
        description: error?.response?.data?.message || "An error occurred",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const calculateMaxDate = () => {
    const today = new Date();
    const year = today.getFullYear() - 18; // Minimum age 18
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchUserDependents = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await query().getUserDependents();
      if (response.success) {
        setUserDependents(response.data);
      } else {
        console.error("Error fetching dependents:", response.message);
      }
    } catch (error) {
      console.error("Error fetching dependents:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DependentContext.Provider
      value={{
        errors,
        loading,
        genders,
        dependents,
        addDependent,
        validateForm,
        isSubmitting,
        relationships,
        userDependents,
        calculateMaxDate,
        setUserDependents,
        fetchUserDependents,
      }}
    >
      {children}
    </DependentContext.Provider>
  );
};

export const useDependents = () => {
  const context = useContext(DependentContext);
  if (context === undefined) {
    throw new Error("useDependents must be used within a DependentProvider");
  }
  return context;
};
