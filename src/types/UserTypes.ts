export type UserProfile = {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    dob: string; 
    passport_image: string;
    gender: "male" | "female" | "other";
    email: string;
    email_verified_at?: string | null; 
    years_of_employment: string;
    employee_id?: string;
    employer_id?: number | null;
    salary?: string;
    loan_limit?: string;
    verification_code?: string | null;
    created_at?: string;
    updated_at?: string;
};
  