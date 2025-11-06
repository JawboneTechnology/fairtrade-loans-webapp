import React from "react";
import { useLocation } from "react-router-dom";
import MakePaymentComponent from "@/components/payments/MakePaymentComponent";

const MakePaymentScreen: React.FC = () => {
    const location = useLocation();
    const state = (location.state || {}) as any;
    const loanId = state?.loanId as string | undefined;
    const amount = state?.amount as number | string | undefined;
    const loanNumber = state?.loanNumber as string | undefined;
    const nextDueDate = state?.nextDueDate as string | undefined;

    if (!loanId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow">Missing loan id — please start payment from the Loans screen</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10">
            <div className="max-w-6xl mx-auto p-6">
                <MakePaymentComponent
                    loanId={loanId}
                    defaultAmount={amount}
                    loanNumber={loanNumber}
                    nextDueDate={nextDueDate}
                />
            </div>
        </div>
    );
};

export default MakePaymentScreen;
