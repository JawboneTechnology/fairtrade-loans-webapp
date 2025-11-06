import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoanQueries from "@/hooks/useLoanQueries";
import { Spinner, FloatingInput } from "@/components";
import { FaArrowLeft } from "react-icons/fa";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

interface MakePaymentProps {
    loanId: string;
    defaultAmount?: number | string;
    loanNumber?: string;
    nextDueDate?: string;
}

const MakePaymentComponent: React.FC<MakePaymentProps> = ({ loanId, defaultAmount, loanNumber, nextDueDate }) => {
    const navigate = useNavigate();
    const { loanPayment } = useLoanQueries();
    const { formatCurrency } = useCurrencyFormatter();
    const [amount, setAmount] = useState<string>(
        defaultAmount ? String(defaultAmount) : ""
    );
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!amount || Number(amount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        // Normalize and validate phone number: accept common local formats and convert to 254XXXXXXXXX
        let normalized = phoneNumber.trim().replace(/\D/g, "");

        if (normalized.length === 10) {
            // e.g. 07XXXXXXXX
            if (normalized.startsWith("0")) {
                normalized = `254${normalized.slice(1)}`;
            } else {
                // if user entered 10 digits without leading zero, prefix directly
                normalized = `254${normalized}`;
            }
        } else if (normalized.length === 9 && normalized.startsWith("7")) {
            // e.g. 7XXXXXXXX -> prefix
            normalized = `254${normalized}`;
        }

        const phoneRegex = /^254[0-9]{9}$/;
        if (!phoneRegex.test(normalized)) {
            setError("Please enter a valid local phone number (10 digits) like 07XXXXXXXX");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const payload = {
                amount: Number(amount),
                phone_number: normalized,
                loan_id: loanId,
            };

            const { success, message } = await loanPayment(payload);

            if (!success) throw new Error(message || "Payment request failed");

            // On success, navigate to payments screen where the user can see the payment entry
            navigate("/payments");
        } catch (err: any) {
            setError(err?.message || "An error occurred while requesting payment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full">
            {/* Fullscreen background to ensure gradient covers entire viewport */}
            <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5 z-0" />

            <div className="min-h-screen flex items-center justify-center py-10 relative z-10">
                <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="text-sm text-primary hover:underline flex items-center gap-2"
                        >
                            <FaArrowLeft />
                            <span>Back</span>
                        </button>
                        <h2 className="text-lg font-bold">Make Payment (Mpesa)</h2>
                        <div />
                    </div>

                    {/* Descriptive info */}
                    <div className="bg-primary/5 rounded-lg p-3 mb-4">
                        <p className="text-sm text-dark/70">
                            You are about to pay{' '}
                            <strong>{formatCurrency(Number(defaultAmount || 0))}</strong>{' '}
                            {loanNumber ? (
                                <span>for Loan #{loanNumber}.</span>
                            ) : (
                                <span>.</span>
                            )}
                        </p>
                        {nextDueDate && (
                            <p className="text-xs text-dark/60 mt-1">Next due date: {nextDueDate}</p>
                        )}
                        <p className="text-xs text-dark/60 mt-2">An Mpesa payment request (STK push) will be sent to the phone number you provide.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <FloatingInput
                                id="amount"
                                label="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                className="w-full"
                            />
                        </div>

                        <div>
                            <FloatingInput
                                id="phone_number"
                                label="Phone Number (Mpesa)"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                type="tel"
                                className="w-full"
                            />
                            <p className="text-xs text-dark/60 mt-1">Enter a 10-digit local number (e.g. <code>07XXXXXXXX</code>). We'll convert it to <code>2547XXXXXXXX</code> before sending.</p>
                        </div>

                        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                        <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 text-white font-semibold py-2 px-6 rounded-2xl flex items-center justify-center space-x-2 disabled:opacity-70"
                            >
                                {loading ? <Spinner size="sm" /> : <span>Request Mpesa Payment</span>}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full sm:w-auto bg-gray-100 text-gray-700 py-2 px-6 rounded-2xl"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakePaymentComponent;
