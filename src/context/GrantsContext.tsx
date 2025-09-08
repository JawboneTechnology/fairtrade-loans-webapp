import { toast } from "sonner";
import query from "@/hooks/useGrantQueries";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/UseAuthStore";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Dependent {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  relationship: string;
  date_of_birth: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApplyGrant {
  user_id: string;
  grant_type_id: string;
  dependent_id: string | null;
  amount: number;
  reason: string;
}

export interface Grant {
  id?: string;
  grant_type_id: string;
  user_id: string;
  dependent_id: string;
  amount: string;
  reason: string;
  status: GrantStatus;
  admin_notes: string | null;
  approval_date: string | null;
  disbursement_date: string | null;
  cancelled_date: string | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  dependent: Dependent;
}

enum GrantStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
  DISBURSED = "disbursed",
}

export interface GrantType {
  id?: string;
  name: string;
  max_amount: string;
  requires_dependent: boolean;
}

// For the array of grants
export type Grants = Grant[];

interface GrantsContextType {
  loading: boolean;
  grants: Grants;
  addGrant: (grant: ApplyGrant) => Promise<void>;
  errors: { [key: string]: string | null };
  validateForm: (formData: ApplyGrant) => boolean;
  isSubmitting: boolean;
  fetchUserGrants: () => Promise<void>;
  userGrants: Grants;
  setUserGrants: React.Dispatch<React.SetStateAction<Grants>>;
  grantTypes: GrantType[];
  fetchGrantTypes: () => Promise<void>;
}
const GrantsContext = createContext({} as GrantsContextType);

export const GrantsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuthStore();
  const [grantTypes, setGrantTypes] = useState<GrantType[]>([]);
  const [userGrants, setUserGrants] = useState<Grants>([]);
  const [loading, setLoading] = useState(false);
  const [grants, setGrants] = useState<Grants>([]);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch user grants
  async function fetchUserGrants() {
    if (!user && loading) return;

    try {
      setLoading(true);
      const response = await query().getUserGrants();

      if (response.success) {
        setUserGrants(response.data);
        setLoading(false);
      } else {
        toast.error("Failed to fetch grants.", {
          description: response.message,
          duration: 5000,
        });
        setLoading(false);
      }
    } catch (error: any) {
      toast.error("An error occurred while fetching grants", {
        description: error?.response?.data?.message || "An error occurred",
        duration: 5000,
      });
      setLoading(false);
    }
  }

  // Validate form
  const validateForm = (formData: ApplyGrant) => {
    const newErrors = {
      grant_type_id: "",
      user_id: "",
      dependent_id: "",
      amount: "",
      reason: "",
    };

    if (!formData.grant_type_id) {
      newErrors.grant_type_id = "Grant type is required";
    }
    if (!formData.user_id) {
      newErrors.user_id = "User ID is required";
    }
    if (!formData.dependent_id) {
      newErrors.dependent_id = "Dependent ID is required";
    }
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    }
    if (!formData.reason) {
      newErrors.reason = "Reason is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  // Add grant
  const addGrant = async (grant: ApplyGrant): Promise<void> => {
    if (!validateForm(grant) && loading) return;

    setIsSubmitting(true);
    try {
      const response = await query().addGrant(grant);
      if (response.success) {
        toast.success(response.message);
        setUserGrants((prevGrants) => [...prevGrants, response.data]);
        setLoading(false);
        setIsSubmitting(false);
        navigate("/grants");
      } else {
        toast.error(response.message);
        setLoading(false);
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("An error occurred while adding the grant");
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  // Fetch grant types
  const fetchGrantTypes = async () => {
    if (!user && loading) return;

    try {
      setLoading(true);
      const response = await query().getGrantTypes();

      if (response.success) {
        setGrantTypes(response.data);
        setLoading(false);
      } else {
        toast.error("Failed to fetch grant types.", {
          description: response.message,
          duration: 5000,
        });
        setLoading(false);
      }
    } catch (error: any) {
      toast.error("An error occurred while fetching grant types", {
        description: error?.response?.data?.message || "An error occurred",
        duration: 5000,
      });
      setLoading(false);
    }
  };

  return (
    <GrantsContext.Provider
      value={{
        grants,
        errors,
        loading,
        addGrant,
        grantTypes,
        userGrants,
        validateForm,
        isSubmitting,
        setUserGrants,
        fetchUserGrants,
        fetchGrantTypes,
      }}
    >
      {children}
    </GrantsContext.Provider>
  );
};

export const useGrants = () => {
  const context = useContext(GrantsContext);
  if (!context) {
    throw new Error("useGrantsContext must be used within a GrantsProvider");
  }
  return context;
};
