import { Grant } from "@/types/GrantTypes";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGrantQueries from "@/hooks/useGrantQueries";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUser,
  FaInfoCircle,
  FaCheck,
  FaTimes,
  FaClock,
} from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";
import { GrantDetailsSkeleton } from "@/components";
import { SkeletonTheme } from "react-loading-skeleton";

const GrantDetailsComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { getSingleGrant } = useGrantQueries();
  const grantId = location.pathname.split("/").pop();
  const [grantDetails, setGrantDetails] = useState<Grant | null>(null);

  const fetchGrantDetails = async (grantId: string) => {
    setLoading(true);

    if (!grantId) {
      console.error("Grant ID is not available");
      setLoading(false);
      return;
    }

    try {
      const response = await getSingleGrant(grantId);
      setGrantDetails(response.data);
    } catch (error) {
      console.error("Error fetching grant details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (grantId) {
      fetchGrantDetails(grantId);
    }
  }, [grantId]);

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2";

    switch (status) {
      case "approved":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <FaCheck /> Approved
          </span>
        );
      case "pending":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            <FaClock /> Pending
          </span>
        );
      case "rejected":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <FaTimes /> Rejected
          </span>
        );
      case "cancelled":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-500`}>
            <IoMdCloseCircle /> Cancelled
          </span>
        );
      case "disbursed":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
            <GiMoneyStack /> Disbursed
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            <FaInfoCircle /> {status}
          </span>
        );
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <SkeletonTheme baseColor="#e7f8fe" highlightColor="#95dbf3">
        <GrantDetailsSkeleton />
      </SkeletonTheme>
    );
  }

  if (!grantDetails) {
    return (
      <div className="min-h-screen bg-light p-4 md:p-6 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Grant not found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested grant could not be loaded.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-primary text-white rounded-lg flex items-center justify-center gap-2 mx-auto"
          >
            <FaArrowLeft /> Back to Grants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-light p-4 md:p-6 overflow-y-scroll pb-[200px]">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-secondary text-gray-700"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Grant Details</h1>
          <div className="ml-auto">{getStatusBadge(grantDetails.status)}</div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left column - Grant information */}
          <div className="bg-white p-6 rounded-xl hover:border-primary border-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaMoneyBillWave className="text-primary" /> Grant Information
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Grant Type</p>
                <p className="font-medium">{grantDetails.grant_type.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Amount Requested</p>
                <p className="font-bold text-dark">
                  KSH {parseFloat(grantDetails.amount).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Reason</p>
                <p className="font-medium">{grantDetails.reason}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Admin Notes</p>
                <p className="font-medium">
                  {grantDetails.admin_notes || "No notes available"}
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Timeline and beneficiary */}
          <div className="space-y-6">
            {/* Timeline section */}
            <div className="bg-white p-6 rounded-xl hover:border-primary border-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-primary" /> Timeline
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Application Date</p>
                  <p className="font-medium">
                    {formatDate(grantDetails.created_at)}
                  </p>
                </div>

                {grantDetails.approval_date && (
                  <div>
                    <p className="text-sm text-gray-500">Approval Date</p>
                    <p className="font-medium">
                      {formatDate(grantDetails.approval_date)}
                    </p>
                  </div>
                )}

                {grantDetails.cancelled_date && (
                  <div>
                    <p className="text-sm text-gray-500">Cancellation Date</p>
                    <p className="font-medium">
                      {formatDate(grantDetails.cancelled_date)}
                    </p>
                  </div>
                )}

                {grantDetails.disbursement_date && (
                  <div>
                    <p className="text-sm text-gray-500">Disbursement Date</p>
                    <p className="font-medium">
                      {formatDate(grantDetails.disbursement_date)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Beneficiary section */}
            {grantDetails.dependent && (
              <div className="bg-white p-6 rounded-xl hover:border-primary border-2">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUser className="text-primary" /> Beneficiary
                </h2>

                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {grantDetails.dependent.gender === "male" ? (
                      <span className="text-4xl">👨</span>
                    ) : (
                      <span className="text-4xl">👩</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {grantDetails.dependent.first_name}{" "}
                      {grantDetails.dependent.last_name}
                    </h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {grantDetails.dependent.relationship}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {grantDetails.dependent.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Applicant information */}
        <div className="bg-white p-6 rounded-xl hover:border-primary border-2 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaUser className="text-primary" /> Applicant Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">
                {grantDetails.user.first_name} {grantDetails.user.middle_name}{" "}
                {grantDetails.user.last_name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Employee ID</p>
              <p className="font-medium">{grantDetails.user.employee_id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{grantDetails.user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantDetailsComponent;
