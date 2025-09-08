import { BsExclamationCircle } from "react-icons/bs";
import { useUserAccount } from "@/context/UserAccountContext";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

const LoanInvoiceDetails = () => {
  const { loanMiniStatement } = useUserAccount();
  const { formatCurrency } = useCurrencyFormatter();
  const { loan_details, transactions, deductions } = loanMiniStatement || {
    loan_details: {},
    transactions: [],
    deductions: [],
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-5">Invoice</h2>

      {/* Loan Details */}
      <div className="h-[calc(100vh-60px)] overflow-y-scroll pb-20">
        <section className="bg-white rounded-lg p-6 mb-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Loan Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-gray-600">Loan Number</p>
              <p className="font-semibold text-gray-800">
                {loan_details.loan_number}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Loan Amount</p>
              <p className="font-semibold text-gray-800">
                {formatCurrency(Number(loan_details.loan_amount))}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Loan Balance</p>
              <p className="font-semibold text-gray-800">
                {formatCurrency(Number(loan_details.loan_balance))}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Interest Rate</p>
              <p className="font-semibold text-gray-800">
                {loan_details.interest_rate}%
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Tenure</p>
              <p className="font-semibold text-gray-800">
                {loan_details.tenure_months} months
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Monthly Installment</p>
              <p className="font-semibold text-gray-800">
                {formatCurrency(Number(loan_details.monthly_installment))}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Next Due Date</p>
              <p className="font-semibold text-gray-800">
                {loan_details.next_due_date}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Loan Status</p>
              <p className="font-semibold text-green-600 capitalize">
                {loan_details.loan_status}
              </p>
            </div>
          </div>
        </section>

        {/* Transactions */}
        <section className="bg-white rounded-lg p-6 mb-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Transactions</h2>
          <div className="space-y-4">
            {transactions?.map((transaction, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between">
                  <p className="text-gray-600">Date</p>
                  <p className="font-semibold text-gray-800">
                    {transaction.transaction_date}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Amount</p>
                  <p className="font-semibold text-gray-800">
                    {formatCurrency(Number(transaction.amount))}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Payment Type</p>
                  <p className="font-semibold text-gray-800">
                    {transaction.payment_type}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Reference</p>
                  <p className="font-semibold text-gray-800">
                    {transaction.transaction_reference}
                  </p>
                </div>
              </div>
            ))}

            {transactions.length === 0 && (
              <div className="flex items-center justify-center py-4">
                <BsExclamationCircle className="text-red-500 mr-2" />
                <p className="text-gray-600">No transactions available</p>
              </div>
            )}
          </div>
        </section>

        {/* Deductions */}
        <section className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Deductions</h2>
          <div className="space-y-4">
            {deductions?.map((deduction, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between">
                  <p className="text-gray-600">Date</p>
                  <p className="font-semibold text-gray-800">
                    {deduction.deduction_date}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Amount</p>
                  <p className="font-semibold text-gray-800">
                    {formatCurrency(Number(deduction.amount))}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Deduction Type</p>
                  <p className="font-semibold text-gray-800">
                    {deduction.deduction_type}
                  </p>
                </div>
              </div>
            ))}

            {deductions.length === 0 && (
              <div className="flex items-center justify-center py-4">
                <BsExclamationCircle className="text-red-500 mr-2" />
                <p className="text-gray-600">No deductions available</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoanInvoiceDetails;
