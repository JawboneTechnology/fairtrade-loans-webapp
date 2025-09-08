import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axiosClient from "@/axiosClient";
import { Spinner, PaymentSkeletonLoader } from "@/components";
import { BsExclamationCircle } from "react-icons/bs";

interface Payment {
  id: string;
  transaction_date: string;
  amount: string;
  payment_type: string;
  transaction_reference: string;
}

interface PaymentsApiResponse {
  success: boolean;
  message: string;
  data: {
    payments: Payment[];
    nextStart: number | null;
  };
}

const PaymentsComponent: React.FC = () => {
  const { formatCurrency } = useCurrencyFormatter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [nextStart, setNextStart] = useState<number | null>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(false);

  const fetchPayments = useCallback(async (start: number) => {
    if (loading || (start !== 0 && nextStart === null)) return;
    
    try {
      setLoading(true);
      const response = await axiosClient.get<PaymentsApiResponse>(
        `loan/user/payments?start=${start}&limit=10`
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const apiResponse = response.data;
      setPayments(prev => start === 0 
        ? apiResponse.data.payments 
        : [...prev, ...apiResponse.data.payments]);
      setNextStart(apiResponse.data.nextStart);
      setError(null);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch payments");
    } finally {
      if (isMounted.current) {
        setLoading(false);
        if (initialLoading) setInitialLoading(false);
      }
    }
  }, [loading, nextStart, initialLoading]);

  const handleScroll = useCallback(() => {
    if (loading || nextStart === null) return;
    
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchPayments(nextStart);
    }
  }, [loading, nextStart, fetchPayments]);

  useEffect(() => {
    isMounted.current = true;
    fetchPayments(0);

    const scrollHandler = () => {
      if (isMounted.current) {
        handleScroll();
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => {
      isMounted.current = false;
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <div className="h-full w-full max-w-[90%] sm:max-w-[80%] mx-auto overflow-y-scroll pb-20 mt-20">
      <div className="bg-white rounded-lg p-6 min-h-[80vh]">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Payments</h2>

        {initialLoading ? (
          <PaymentSkeletonLoader />
        ) : error ? (
          <div className="text-center text-gray-600 py-10 h-full grid place-content-center">
            <div className="flex justify-center items-center w-full">
              <BsExclamationCircle className="text-5xl text-red-500" />
            </div>
            <p className="text-lg font-medium text-dark">
              Error loading payments
            </p>
            <p className="text-sm text-gray-500">
              {error}
            </p>
            <button 
              onClick={() => fetchPayments(0)}
              className="mt-4 bg-primary text-white py-2 px-4 rounded-md"
            >
              Retry
            </button>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center text-gray-600 py-10 h-full grid place-content-center mt-[150px]">
            <div className="flex justify-center items-center w-full">
              <BsExclamationCircle className="text-5xl text-primary" />
            </div>
            <p className="text-lg font-medium text-dark">
              You have no payments.
            </p>
            <p className="text-sm text-gray-500">
              Start making payments to view them here.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">
                        Date
                      </span>
                      <span className="text-gray-600 text-sm">
                        {payment.transaction_date}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2 md:mt-0">
                      <span className="text-sm font-semibold text-gray-700">
                        Amount
                      </span>
                      <span className="text-gray-600 text-sm">
                        {formatCurrency(Number(payment.amount))}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">
                        Payment Type
                      </span>
                      <span className="text-gray-600 text-sm">
                        {payment.payment_type}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2 md:mt-0">
                      <span className="text-sm font-semibold text-gray-700">
                        Reference
                      </span>
                      <span className="text-gray-600 break-all text-sm">
                        {payment.transaction_reference}
                      </span>
                    </div>
                  </div>

                  <DeletePaymentButton
                    payment={payment}
                    setPayments={setPayments}
                  />
                </div>
              ))}
            </div>
            {loading && (
              <div className="flex justify-center my-4">
                <Spinner size="md" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const DeletePaymentButton: React.FC<{
  payment: Payment;
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}> = ({ payment, setPayments }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;

    try {
      setLoading(true);
      const response = await axiosClient.delete(`loan/user/payments/${payment.id}`);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setPayments(prev => prev.filter(p => p.id !== payment.id));
    } catch (error) {
      console.error("Error deleting payment:", error);
      alert(error instanceof Error ? error.message : "Failed to delete payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="mt-4 bg-red-100 text-red-500 hover:bg-red-200 py-2 px-4 rounded-md w-full disabled:opacity-70"
    >
      {loading ? <Spinner size="sm" color="text-red-500" /> : "Delete"}
    </button>
  );
};

export default PaymentsComponent;