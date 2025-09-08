export interface Guarantor {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    pivot: {
        loan_id: number;
        guarantor_id: number;
        status: string;
        loan_number: string;
        guarantor_liability_amount: string;
        created_at: string;
        updated_at: string;
    };
}
  
export interface LoanType {
    id: number;
    name: string;
    interest_rate: string;
    approval_type: string;
    requires_guarantors: boolean;
    guarantor_qualifications: {
        min_credit_score: number;
        employment_years: number;
    };
    status: string;
    type: string;
    required_guarantors_count: string;
    payment_type: string;
    created_at: string;
    updated_at: string;
}
  
export interface Loan {
    id: number;
    loan_number: string;
    employee_id: number;
    loan_type_id: number;
    loan_amount: string;
    loan_balance: string;
    next_due_date: string;
    interest_rate: string;
    tenure_months: number;
    monthly_installment: string;
    loan_status: string;
    approved_amount: string | null;
    approved_by: string | null;
    approved_at: string | null;
    guarantors: Guarantor[];
    remarks: string;
    applied_at: string;
    qualifications: {
        total_loans: number;
        defaults: number;
        successfulRepayments: number;
        credit_score: number;
    };
    created_at: string;
    updated_at: string;
}

export interface GuarantorLoan {
    id: string;
    loan_id: string;
    guarantor_id: string;
    loan_number: string;
    guarantor_liability_amount: number;
    status: 'pending' | 'approved' | 'rejected' | 'accepted' | 'declined';
    created_at: string;
    updated_at: string;
    user: {
        id: string;
        first_name: string;
        middle_name: string;
        last_name: string;
        phone_number: string;
        passport_image: string;
        employee_id: string;
        old_employee_id: string;
    }
}
  
export interface LoanDetailsData {
    loanType: LoanType;
    loan: Loan;
    guarantors: GuarantorLoan[];
}
  
export interface LoanDetailsComponentProps {
    data: LoanDetailsData;
}

interface Transaction {
    transaction_date: string;
    amount: string;
    payment_type: string;
    transaction_reference: string;
}

interface Deduction {
    deduction_date: string;
    amount: string;
    deduction_type: string;
}

interface LoanDetails {
    loan_number: string;
    loan_amount: string;
    loan_balance: string;
    interest_rate: string;
    tenure_months: number;
    monthly_installment: string;
    next_due_date: string;
    loan_status: string;
}

export interface LoanData {
    loan_details: LoanDetails;
    transactions: Transaction[];
    deductions: Deduction[];
}

interface UserLoan {
    loan_id: number;
    loan_number: string;
    loan_amount: string;
    loan_balance: string;
    interest_rate: string;
    tenure_months: number;
    monthly_installment: string;
    next_due_date: string;
    loan_status: string;
}

export interface UserLoansData {
    loans: UserLoan[];
}