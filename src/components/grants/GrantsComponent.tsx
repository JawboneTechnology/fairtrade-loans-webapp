import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGrants } from "@/context/GrantsContext";
import { HiArrowNarrowRight } from "react-icons/hi";
import { GrantsLoadingSkeleton } from "@/components";
import useGrantQueries from "@/hooks/useGrantQueries";
import { Modal, UniversalButton } from "@/components";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { Grant } from "@/context/GrantsContext";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

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
    status: "pending" | "approved" | "rejected" | "disbursed" | string
  ) => {
    const statusClasses: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      cancelled: "bg-red-100 text-red-500",
      disbursed: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          statusClasses[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  useEffect(() => {
    fetchUserGrants();
  }, []);

  if (loading) {
    return <GrantsLoadingSkeleton />;
  }

  return (
    <div className="h-full p-4 md:p-6 pb-[200px] overflow-y-scroll">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="mx-3">
            <h1 className="text-2xl font-bold text-secondary">My Grants</h1>
            <p className="text-white">Manage your grant applications</p>
          </div>

          <Link
            to="/apply-grant"
            className="justify-center mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-secondary text-dark font-medium rounded-lg transition-colors shadow-sm mx-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Apply for New Grant
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-primary p-3 rounded-b-lg shadow-sm">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Grants</p>
            <p className="text-xl font-bold text-gray-800">
              {grantsData.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-xl font-bold text-yellow-600">
              {grantsData.filter((g) => g.status === "pending").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Approved</p>
            <p className="text-xl font-bold text-green-600">
              {grantsData.filter((g) => g.status === "approved").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-xl font-bold text-primary-600">
              {formatCurrency(
                grantsData.reduce(
                  (sum, grant) => sum + parseFloat(grant.amount),
                  0
                )
              )}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Cancelled</p>
            <p className="text-xl font-bold text-red-600">
              {grantsData.filter((g) => g.status === "cancelled").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Cancelled</p>
            <p className="text-xl font-bold text-red-600">
              {formatCurrency(
                grantsData.reduce(
                  (sum, grant) =>
                    sum +
                    (grant.status === "cancelled"
                      ? sum + parseFloat(grant.amount)
                      : 0),
                  0
                )
              )}
            </p>
          </div>
        </div>

        {/* Grants List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          {grantsData.length === 0 ? (
            <div className="p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No grants found
              </h3>
              <p className="mt-1 text-gray-500">
                You haven't applied for any grants yet.
              </p>
              <div className="mt-6">
                <Link
                  to="/apply-grant"
                  className="inline-flex items-center px-6 py-2 bg-primary text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                  Apply for Your First Grant
                </Link>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {grantsData.map((grant) => (
                <li key={grant.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-800 truncate">
                          {grant.dependent?.first_name}{" "}
                          {grant.dependent?.last_name}
                        </h3>
                        {statusBadge(grant.status)}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {grant.reason}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          KSH {grant.amount}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Applied:{" "}
                          {new Date(
                            grant.created_at || ""
                          ).toLocaleDateString()}
                        </span>
                        {grant.status === "cancelled" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Cancelled:{" "}
                            {new Date(
                              grant.cancelled_date || ""
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-full mt-4 md:mt-0 flex space-x-2">
                      <Link
                        to={`/grants/${grant.id}`}
                        className="justify-center inline-flex items-center px-3 py-1.5 shadow-sm text-sm font-medium rounded-md text-white bg-primary focus:outline-none"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleDelete(grant.id || "")}
                        disabled={grant.status == "cancelled"}
                        className={`justify-center inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md ${
                          grant.status == "cancelled"
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "text-white bg-red-300 hover:bg-red-700"
                        }`}
                      >
                        {grant.status == "cancelled"
                          ? "Cancelled"
                          : "Cancel Application"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cancel Application Confirmation Modal */}
        {showCancelModal && (
          <Modal
            closable={false}
            onClose={toggleShowCancelModal}
            className="w-full sm:w-[50%]"
          >
            <div className="p-5 py-10 w-[95%] mx-auto bg-white rounded-xl">
              <div className="flex items-center justify-center mb-5">
                <BsFillQuestionCircleFill className="text-[100px] text-primary" />
              </div>

              <h3 className="text-2xl font-semibold text-center text-primary">
                Are you sure?
              </h3>
              <p className="mt-2 text-gray-600 text-center">
                You are about to cancel this grant application.
              </p>

              <p className="mt-2 text-gray-600 text-center border bg-light border-primary/50 p-3 rounded-lg italic">
                <span className="text-primary font-semibold">Note:</span>
                This action cannot be undone. Please confirm if you want to
                proceed with the cancellation.
              </p>

              <div className="mt-5">
                <UniversalButton
                  className="bg-primary hover:bg-primary-dark w-full text-white rounded-full py-2 text-lg"
                  title="Continue with Cancellation"
                  handleClick={confirmCancellation}
                  icon={<HiArrowNarrowRight className="text-xl" />}
                  isCustomIcon={true}
                />

                <UniversalButton
                  className="bg-light hover:bg-primary/50 w-full text-primary rounded-full py-2 text-lg mt-3"
                  title="Cancel"
                  handleClick={toggleShowCancelModal}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default GrantsComponent;
