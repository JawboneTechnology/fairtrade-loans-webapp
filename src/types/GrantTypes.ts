enum GrantStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    CANCELLED = "cancelled",
    DISBURSED = "disbursed",
}

type User = {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    employee_id: string;
  };
  
  type Dependent = {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    relationship: string;
    gender: string | 'male' | 'female' | 'other';
  };
  
  type GrantType = {
    id: string;
    grant_code: string;
    name: string;
    description: string;
    max_amount: string;
  };
  
  type Grant = {
    id: string;
    grant_type_id: string;
    user_id: string;
    dependent_id: string | null;
    amount: string;
    reason: string;
    status: GrantStatus;
    admin_notes: string | null;
    approval_date: string | null;
    cancelled_date: string | null;
    disbursement_date: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    user: User;
    dependent: Dependent | null;
    grant_type: GrantType;
  };
  
  export type { User, Dependent, GrantType, GrantStatus, Grant };