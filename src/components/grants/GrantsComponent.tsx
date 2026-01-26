import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGrants } from "@/context/GrantsContext";
import { GrantsLoadingSkeleton } from "@/components";
import useGrantQueries from "@/hooks/useGrantQueries";
import { Modal } from "@/components";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { Grant } from "@/context/GrantsContext";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import {
  FaGift,
  FaPlus,
  FaEye,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBan,
  FaChartLine,
} from "react-icons/fa";
import { MdCancel, MdTrendingUp } from "react-icons/md";

const GrantsComponent = () => {
  const {
    loading,
    fetchUserGrants,
    userGrants: grantsData,
    setUserGrants: setGrantsData,
  } = useGrants();

  const { formatCurrency } = useCurrencyFormatter();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState<string | null>(null);

  const toggleShowCancelModal = () => setShowCancelModal((prev) => !prev);

  const handleDelete = (grantId: string): void => {
    setSelectedGrant(grantId);
    setShowCancelModal(true);
  };

  const confirmCancellation = async () => {
    if (!selectedGrant) return;

    try {
      const response = await useGrantQueries().cancelGrantApplication(
        selectedGrant
      );

      if (response.success) {
        setGrantsData((prev) =>
          prev.map((grant) =>
            grant.id === selectedGrant
              ? ({ ...grant, status: "cancelled" } as Grant)
              : grant
          )
        );
        toast.success("Grant cancelled!", {
          description: response.message,
          duration: 5000,
        });
      } else {
        toast.error("Failed to cancel grant.", {
          description: response.message,
          duration: 5000,
        });
      }
    } finally {
      setShowCancelModal(false);
    }
  };

  const statusBadge = (
    status:
      | "pending"
      | "approved"
      | "rejected"
      | "disbursed"
      | "cancelled"
      | string
  ) => {
    const baseClasses =
      "px-3 py-1.5 text-xs font-bold rounded-2xl capitalize flex items-center space-x-1";

    switch (status.toLowerCase()) {
      case "approved":
        return (
          <span
            className={`${baseClasses} bg-green-100 text-green-700 border border-green-200`}
          >
            <FaCheckCircle className="text-xs" />
            <span>{status}</span>
          </span>
        );
      case "pending":
        return (
          <span
            className={`${baseClasses} bg-amber-100 text-amber-700 border border-amber-200`}
          >
            <FaClock className="text-xs" />
            <span>{status}</span>
          </span>
        );
      case "rejected":
        return (
          <span
            className={`${baseClasses} bg-red-100 text-red-700 border border-red-200`}
          >
            <FaTimesCircle className="text-xs" />
            <span>{status}</span>
          </span>
        );
      case "cancelled":
        return (
          <span
            className={`${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`}
          >
            <FaBan className="text-xs" />
            <span>{status}</span>
          </span>
        );
      case "disbursed":
        return (
          <span
            className={`${baseClasses} bg-blue-100 text-blue-700 border border-blue-200`}
          >
            <FaGift className="text-xs" />
            <span>{status}</span>
          </span>
        );
      default:
        return (
          <span
            className={`${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`}
          >
            <span>{status}</span>
          </span>
        );
    }
  };

  useEffect(() => {
    fetchUserGrants();
  }, []);

  if (loading) {
    return <GrantsLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen pb-[200px]">
      <div className="px-6 sm:px-0 py-4 md:py-0 sm:py-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-secondary to-secondary/80 rounded-3xl sm:rounded-sm p-4 sm:p-8 md:p-20 text-dark relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-dark/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-dark/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
                <div className="bg-dark/10 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-shrink-0">
                  <FaGift className="text-xl sm:text-2xl text-dark" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-dark truncate">My Grants</h1>
                  <p className="text-dark/80 text-xs sm:text-sm truncate">
                    Track your financial assistance applications
                  </p>
                </div>
              </div>

              <Link
                to="/apply-grant"
                className="w-full sm:w-auto bg-dark/10 hover:bg-dark/20 backdrop-blur-sm border border-dark/20 text-dark font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 inline-flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <FaPlus className="text-base sm:text-lg" />
                <span>Apply for New Grant</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          {/* Stats Summary */}
          {grantsData.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {/* Total Grants */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-200">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-secondary/20 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-shrink-0">
                    <MdTrendingUp className="text-dark text-base sm:text-lg lg:text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-dark/60 truncate">
                      Total Applications
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-dark truncate">
                      {grantsData.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Approved Grants */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-200">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-green-100 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-shrink-0">
                    <FaCheckCircle className="text-green-600 text-base sm:text-lg lg:text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-dark/60 truncate">Approved</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 truncate">
                      {grantsData.filter((g) => g.status === "approved").length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pending Grants */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-200">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-amber-100 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-shrink-0">
                    <FaClock className="text-amber-600 text-base sm:text-lg lg:text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-dark/60 truncate">
                      Pending Review
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-600 truncate">
                      {grantsData.filter((g) => g.status === "pending").length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Amount */}
              <div className="bg-gradient-to-r from-secondary to-secondary/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl text-dark hover:shadow-2xl transition-all duration-200">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-dark/10 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-shrink-0">
                    <FaChartLine className="text-dark text-base sm:text-lg lg:text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-dark/80 truncate">
                      Total Requested
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-dark break-words leading-tight">
                      {formatCurrency(
                        grantsData.reduce(
                          (sum, grant) => sum + parseFloat(grant.amount),
                          0
                        )
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grants List */}
          <div className="space-y-4">
            {grantsData.length === 0 ? (
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-12 text-center">
                <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-4 sm:mb-6">
                  <FaGift className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-secondary mb-3 sm:mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-dark mb-2">
                    No Grant Applications
                  </h3>
                  <p className="text-dark/70 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
                    Start your journey to financial assistance. Apply for grants
                    that can help you achieve your goals.
                  </p>
                </div>
                <Link
                  to="/apply-grant"
                  className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary hover:to-secondary text-dark font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-200 active:scale-95 inline-flex items-center justify-center space-x-2 sm:space-x-3 shadow-xl hover:shadow-2xl text-sm sm:text-base w-full sm:w-auto"
                >
                  <FaPlus className="text-base sm:text-lg flex-shrink-0" />
                  <span className="truncate">Apply for Your First Grant</span>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-dark">
                    Grant Applications
                  </h2>
                  <span className="text-dark/60 text-xs sm:text-sm">
                    {grantsData.length} application
                    {grantsData.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  {grantsData.map((grant) => (
                    <div
                      key={grant.id}
                      className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="space-y-4 sm:space-y-6">
                        {/* Grant Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                            <div className="bg-gradient-to-r from-secondary to-secondary/80 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex-shrink-0">
                              <FaGift className="text-dark text-base sm:text-lg lg:text-xl" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-lg sm:text-xl font-bold text-dark truncate">
                                {grant.dependent?.first_name}{" "}
                                {grant.dependent?.last_name}
                              </h3>
                              <p className="text-dark/60 text-xs sm:text-sm truncate">
                                Grant Application
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 self-start sm:self-center">
                            {statusBadge(grant.status)}
                          </div>
                        </div>

                        {/* Grant Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                          <div className="bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <FaChartLine className="text-secondary text-xs sm:text-sm flex-shrink-0" />
                              <p className="text-xs sm:text-sm font-medium text-dark/70 truncate">
                                Amount Requested
                              </p>
                            </div>
                            <p className="text-base sm:text-lg font-bold text-dark break-words">
                              {formatCurrency(parseFloat(grant.amount))}
                            </p>
                          </div>

                          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <FaClock className="text-primary text-xs sm:text-sm flex-shrink-0" />
                              <p className="text-xs sm:text-sm font-medium text-dark/70 truncate">
                                Applied Date
                              </p>
                            </div>
                            <p className="text-base sm:text-lg font-bold text-dark break-words">
                              {new Date(
                                grant.created_at || ""
                              ).toLocaleDateString()}
                            </p>
                          </div>

                          {grant.status === "cancelled" && (
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <FaBan className="text-gray-600 text-xs sm:text-sm flex-shrink-0" />
                                <p className="text-xs sm:text-sm font-medium text-dark/70 truncate">
                                  Cancelled Date
                                </p>
                              </div>
                              <p className="text-base sm:text-lg font-bold text-gray-600 break-words">
                                {new Date(
                                  grant.cancelled_date || ""
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Grant Reason */}
                        <div className="bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                          <p className="text-xs sm:text-sm font-medium text-dark/70 mb-2">
                            Reason for Grant
                          </p>
                          <p className="text-sm sm:text-base text-dark leading-relaxed break-words whitespace-pre-wrap overflow-hidden">
                            {grant.reason}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <Link
                            to={`/grants/${grant.id}`}
                            className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                          >
                            <FaEye className="text-base sm:text-lg flex-shrink-0" />
                            <span className="truncate">View Details</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(grant.id || "")}
                            disabled={grant.status === "cancelled"}
                            className={`flex-1 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base ${grant.status === "cancelled"
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                              }`}
                          >
                            {grant.status === "cancelled" ? (
                              <>
                                <FaBan className="text-base sm:text-lg flex-shrink-0" />
                                <span className="truncate">Already Cancelled</span>
                              </>
                            ) : (
                              <>
                                <FaTimes className="text-base sm:text-lg flex-shrink-0" />
                                <span className="truncate">Cancel Application</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Cancel Application Confirmation Modal */}
          {showCancelModal && (
            <Modal
              closable={false}
              onClose={toggleShowCancelModal}
              className="w-full sm:w-[50%]"
            >
              <div className="p-8 w-[95%] mx-auto bg-white rounded-3xl shadow-2xl">
                <div className="text-center mb-6">
                  <div className="bg-red-100 rounded-3xl p-6 mx-auto w-24 h-24 flex items-center justify-center mb-4">
                    <BsFillQuestionCircleFill className="text-4xl text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-2">
                    Confirm Cancellation
                  </h3>
                  <p className="text-dark/70 text-lg">
                    You are about to cancel this grant application.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-4 mb-6">
                  <p className="text-red-800 text-center">
                    <span className="font-bold">Important:</span> This action
                    cannot be undone. Please confirm if you want to proceed with
                    the cancellation.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={confirmCancellation}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <MdCancel className="text-xl" />
                    <span>Yes, Cancel Application</span>
                  </button>

                  <button
                    onClick={toggleShowCancelModal}
                    className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-dark font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    Keep Application
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrantsComponent;
