import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoanQueries from "@/hooks/useLoanQueries";
import { Spinner, FloatingInput, Modal, UniversalButton } from "@/components";
import { FaArrowLeft } from "react-icons/fa";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

interface MakePaymentProps {
    loanId: string;
    defaultAmount?: number | string;
    loanNumber?: string;
    nextDueDate?: string;
}

const MakePaymentComponent: React.FC<MakePaymentProps> = ({ loanId, defaultAmount, loanNumber, nextDueDate }) => {
    const navigate = useNavigate();
    const { loanPayment, verifyPayment } = useLoanQueries();
    const { formatCurrency } = useCurrencyFormatter();
    const [amount, setAmount] = useState<string>(
        defaultAmount ? String(defaultAmount) : ""
    );
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [showProcessingModal, setShowProcessingModal] = useState<boolean>(false);
    const [showResultModal, setShowResultModal] = useState<boolean>(false);
    const [resultType, setResultType] = useState<'success' | 'pending' | 'error' | null>(null);
    const [resultMessage, setResultMessage] = useState<string>('');
    const [verifyLoading, setVerifyLoading] = useState<boolean>(false);
    const [lastVerifyPayload, setLastVerifyPayload] = useState<any>(null);

    const handleRetry = async () => {
        if (!lastVerifyPayload) return;
        setVerifyLoading(true);
        try {
            const verifyResult = await verifyPayment(lastVerifyPayload);

            if (verifyResult.success && verifyResult.payment_complete) {
                setResultType('success');
                setResultMessage(verifyResult.message || 'Payment completed successfully');
                setShowResultModal(true);
            } else if (verifyResult.success && !verifyResult.payment_complete) {
                setResultType('pending');
                setResultMessage(verifyResult.message || 'Payment is still pending.');
                setShowResultModal(true);
            } else {
                setResultType('error');
                setResultMessage(verifyResult.message || 'An error occurred while verifying payment');
                setShowResultModal(true);
            }
        } catch (err: any) {
            setResultType('error');
            setResultMessage(err?.message || 'An error occurred while verifying the payment');
            setShowResultModal(true);
        } finally {
            setVerifyLoading(false);
        }
    };

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

            const { success, message, data } = await loanPayment(payload);

            if (!success) throw new Error(message || "Payment request failed");

            // Show processing modal and start verification after 10s
            setShowProcessingModal(true);
            setResultMessage('STK Push sent to ' + normalized + '. Please check your phone and enter your M-Pesa PIN.');

            // wait 10 seconds then verify
            const verifyPayload: any = {};
            if (data?.transaction_id) verifyPayload.transaction_id = data.transaction_id;
            if (data?.checkout_request_id) verifyPayload.checkout_request_id = data.checkout_request_id;
            verifyPayload.phone_number = normalized;
            setLastVerifyPayload(verifyPayload);

            setTimeout(async () => {
                setVerifyLoading(true);
                try {
                    const verifyResult = await verifyPayment(verifyPayload);

                    setShowProcessingModal(false);

                    if (verifyResult.success && verifyResult.payment_complete) {
                        setResultType('success');
                        setResultMessage(verifyResult.message || 'Payment completed successfully');
                        setShowResultModal(true);
                    } else if (verifyResult.success && !verifyResult.payment_complete) {
                        setResultType('pending');
                        setResultMessage(verifyResult.message || 'Payment is still pending.');
                        setShowResultModal(true);
                    } else {
                        setResultType('error');
                        setResultMessage(verifyResult.message || 'An error occurred while verifying payment');
                        setShowResultModal(true);
                    }
                } catch (err: any) {
                    setShowProcessingModal(false);
                    setResultType('error');
                    setResultMessage(err?.message || 'An error occurred while verifying the payment');
                    setShowResultModal(true);
                } finally {
                    setVerifyLoading(false);
                    setLoading(false);
                }
            }, 10000);
        } catch (err: any) {
            setError(err?.message || "An error occurred while requesting payment");
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full">
            {/* Fullscreen background to ensure gradient covers entire viewport */}
            <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5 z-0" />

            <div className="min-h-screen flex items-center py-10 relative z-10">
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

                    {/* Processing modal shown while waiting for verification */}
                    {showProcessingModal && (
                        <Modal onClose={() => { }} closable={false} className="w-full sm:w-[40%]">
                            <div className="p-6 w-[95%] mx-auto bg-white rounded-xl text-center">
                                <div className="flex items-center justify-center">
                                    <Spinner size="lg" color="text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold mt-4">STK Push Sent</h3>
                                <p className="mt-2 text-sm text-gray-600">{resultMessage}</p>
                                <p className="mt-3 text-sm text-gray-500">We'll automatically check the payment status shortly.</p>
                            </div>
                        </Modal>
                    )}

                    {/* Result modal: success, pending, or error */}
                    {showResultModal && (
                        <Modal onClose={() => setShowResultModal(false)} className="w-full sm:w-[40%]">
                            <div className="p-6 w-[95%] mx-auto bg-white rounded-xl text-center">
                                {resultType === 'success' && (
                                    <FaCircleCheck className="text-[80px] text-primary mx-auto" />
                                )}
                                {resultType === 'error' && (
                                    <FaCircleXmark className="text-[80px] text-red-500 mx-auto" />
                                )}
                                {resultType === 'pending' && (
                                    <div className="flex items-center justify-center">
                                        <Spinner size="lg" color="text-primary" />
                                    </div>
                                )}

                                <h3 className="text-2xl font-semibold mt-4">
                                    {resultType === 'success' ? 'Payment Successful' : resultType === 'pending' ? 'Payment Pending' : 'Payment Error'}
                                </h3>
                                <p className="mt-2 text-gray-600">{resultMessage}</p>

                                <div className="mt-5 flex gap-3 justify-center">
                                    {resultType === 'pending' ? (
                                        <>
                                            <UniversalButton
                                                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold py-3 px-6 rounded-2xl shadow-lg"
                                                title={verifyLoading ? 'Checking...' : 'Retry'}
                                                handleClick={handleRetry}
                                            />
                                            <UniversalButton
                                                className="bg-gray-200 text-dark font-semibold py-3 px-6 rounded-2xl"
                                                title="Close"
                                                handleClick={() => setShowResultModal(false)}
                                            />
                                        </>
                                    ) : (
                                        <UniversalButton
                                            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold py-3 px-6 rounded-2xl shadow-lg"
                                            title="OK"
                                            handleClick={() => {
                                                setShowResultModal(false);
                                                if (resultType === 'success') {
                                                    navigate('/loans');
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </Modal>
                    )}

                </div>
            </div>
        </div>
    );
};

export default MakePaymentComponent;
