import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/axiosClient";
import { Spinner, PaymentSkeletonLoader } from "@/components";
import { BsExclamationCircle } from "react-icons/bs";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaMoneyCheckAlt, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

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
  const navigate = useNavigate();
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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Header Section with Gradient Background */}
        <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 pb-8 pt-12 px-4 rounded-b-3xl shadow-xl">
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-secondary/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-light/10 rounded-full blur-lg"></div>

          {/* Header Content */}
          <div className="relative z-10">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-white hover:text-white/80 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 py-2 rounded-full mb-6 transition-all duration-200 active:scale-95 border border-white/20"
            >
              <HiArrowNarrowLeft className="mr-2 text-xl" />
              Back
            </button>

            {/* Title Section */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                  <FaMoneyCheckAlt className="text-3xl text-white" />
                </div>
              </div>
              <h1 className="text-white font-bold text-2xl sm:text-3xl mb-2">
                Payment History
              </h1>
              <p className="text-white/80 text-sm">
                View all your loan payment transactions
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 -mt-4 relative z-10 pb-6">
          {initialLoading ? (
            <PaymentSkeletonLoader />
          ) : error ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 rounded-full p-4">
                  <BsExclamationCircle className="text-5xl text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">
                Error loading payments
              </h3>
              <p className="text-dark/60 mb-6">
                {error}
              </p>
              <button
                onClick={() => fetchPayments(0)}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02]"
              >
                Retry
              </button>
            </div>
          ) : payments.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <FaMoneyCheckAlt className="text-5xl text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">
                No payments yet
              </h3>
              <p className="text-dark/60 mb-6">
                Start making payments to view them here.
              </p>
              <button
                onClick={() => navigate("/make-payment")}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02]"
              >
                Make Payment
              </button>
            </div>
          ) : (
            <>
              {/* Summary Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark/60 mb-1">Total Payments</p>
                    <p className="text-2xl font-bold text-primary">
                      {payments.length}
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-2xl p-4">
                    <FaMoneyCheckAlt className="text-2xl text-primary" />
                  </div>
                </div>
              </div>

              {/* Payments List */}
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-2 border border-green-200">
                            <FaMoneyCheckAlt className="text-green-600 text-lg" />
                          </div>
                          <div>
                            <h3 className="font-bold text-dark">
                              {formatCurrency(Number(payment.amount))}
                            </h3>
                            <p className="text-xs text-dark/60">
                              {formatDate(payment.transaction_date)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full capitalize">
                        {payment.payment_type}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-dark/60 mb-1">Payment Type</p>
                        <p className="text-sm font-semibold text-dark capitalize">
                          {payment.payment_type}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-dark/60 mb-1">Transaction Reference</p>
                        <p className="text-sm font-semibold text-dark break-all">
                          {payment.transaction_reference}
                        </p>
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
                <div className="flex justify-center my-6">
                  <Spinner size="md" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
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
      toast.success("Payment deleted successfully", {
        description: "The payment has been removed from your history",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.error("Failed to delete payment", {
        description: error instanceof Error ? error.message : "An error occurred",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-red-200 text-sm font-semibold rounded-2xl text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-200 transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Spinner size="sm" color="text-red-500" />
          <span className="ml-2">Deleting...</span>
        </>
      ) : (
        <>
          <FaTrash className="mr-2" />
          <span>Delete Payment</span>
        </>
      )}
    </button>
  );
};

export default PaymentsComponent;