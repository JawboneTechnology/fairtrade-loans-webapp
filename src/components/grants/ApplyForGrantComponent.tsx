import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import useAuthStore from "@/store/UseAuthStore";
import { useGrants } from "@/context/GrantsContext";
import { SkeletonTheme } from "react-loading-skeleton";
import { useDependents } from "@/context/DependentContext";
import { UniversalButton, GrantApplicationSkeleton } from "@/components";
import {
  FaCheck,
  FaArrowLeft,
  FaInfoCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

const ApplyForGrantComponent = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    fetchGrantTypes,
    grantTypes,
    loading: loadingGrantTypes,
    addGrant: applyForGrant,
  } = useGrants();
  const {
    fetchUserDependents,
    userDependents: dependents,
    loading: loadingDependents,
  } = useDependents();

  const [formData, setFormData] = useState({
    grant_type_id: "",
    dependent_id: "",
    amount: "",
    reason: "",
  });

  const [errors, setErrors] = useState({
    grant_type_id: "",
    dependent_id: "",
    amount: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchGrantTypes();
    fetchUserDependents();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      grant_type_id: "",
      dependent_id: "",
      amount: "",
      reason: "",
    };
    let isValid = true;

    if (!formData.grant_type_id) {
      newErrors.grant_type_id = "Please select a grant type";
      isValid = false;
    }

    const selectedGrantType = grantTypes.find(
      (gt) => gt.id === formData.grant_type_id
    );
    if (selectedGrantType?.requires_dependent && !formData.dependent_id) {
      newErrors.dependent_id = "This grant requires selecting a dependent";
      isValid = false;
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
      isValid = false;
    } else if (
      selectedGrantType &&
      parseFloat(formData.amount) > parseFloat(selectedGrantType.max_amount)
    ) {
      newErrors.amount = `Amount cannot exceed ${selectedGrantType.max_amount}`;
      isValid = false;
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Reason is required";
      isValid = false;
    } else if (formData.reason.length < 20) {
      newErrors.reason = "Reason must be at least 20 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    setIsSubmitting(true);
    try {
      await applyForGrant({
        user_id: user.id,
        grant_type_id: formData.grant_type_id,
        dependent_id: formData.dependent_id || "",
        amount: Number(formData.amount),
        reason: formData.reason,
      });
    } catch (error) {
      toast.error("An error occurred while submitting your application");
      console.error("Application error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedGrantType = grantTypes.find(
    (gt) => gt.id === formData.grant_type_id
  );

  if (loadingGrantTypes || loadingDependents) {
    return (
      <SkeletonTheme baseColor="#e7f8fe" highlightColor="#95dbf3">
        <GrantApplicationSkeleton />;
      </SkeletonTheme>
    );
  }

  return (
    <>
      <div className="p-4 md:p-6">
        <div className="fixed top-5 left-5 z-50">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary bg-secondary px-8 py-2 rounded-full hover:text-gray-800"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        </div>

        <div className="max-w-3xl mx-auto pb-[100px] h-full overflow-y-scroll">
          {/* Application Form */}
          <div className="bg-white rounded-xl shadow-lg mt-14 space-y-6 p-5">
            <h1 className="text-2xl font-bold text-gray-800">
              Apply for Grant
            </h1>

            {/* Grant Type Selection */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaMoneyBillWave className="mr-2 text-primary" />
                Grant Type
              </h2>
              <p className="text-sm text-gray-600">
                Select the type of grant you're applying for
              </p>

              {loadingGrantTypes ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                </div>
              ) : grantTypes.length === 0 ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-yellow-700">
                    No available grant types found. Please try again later.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-scroll">
                  {grantTypes.map((grantType) => (
                    <div
                      key={grantType.id}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          grant_type_id: grantType.id || "",
                          dependent_id: grantType.requires_dependent
                            ? prev.dependent_id
                            : "",
                        }));
                        setErrors((prev) => ({ ...prev, grant_type_id: "" }));
                      }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.grant_type_id === grantType.id
                          ? "border-primary bg-light"
                          : "border-gray-300 hover:border-primary-300"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-800">
                          {grantType.name}
                        </h3>
                        {formData.grant_type_id === grantType.id && (
                          <FaCheck className="text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Max amount: KSH {grantType.max_amount}
                      </p>
                      {grantType.requires_dependent && (
                        <p className="text-xs text-primary mt-1 flex items-center">
                          <FaInfoCircle className="mr-1 text-primary" />{" "}
                          Requires dependent
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {errors.grant_type_id && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.grant_type_id}
                </p>
              )}
            </div>

            {/* Dependent Selection (conditionally shown) */}
            {selectedGrantType?.requires_dependent && (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FaCircleUser className="mr-2 text-primary" />
                  Select Dependent
                </h2>
                <p className="text-sm text-gray-600">
                  This grant requires selecting a family member as beneficiary
                </p>

                {loadingDependents ? (
                  <div className="animate-pulse h-12 bg-gray-200 rounded-lg"></div>
                ) : dependents.length === 0 ? (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-700">
                      You don't have any dependents added yet. Please add a
                      dependent first.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate("/create-dependant")}
                      className="mt-2 text-sm text-primary-600 hover:text-primary-800 font-medium"
                    >
                      Add Dependent
                    </button>
                  </div>
                ) : (
                  <select
                    name="dependent_id"
                    value={formData.dependent_id}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-primary focus:border-primary ${
                      errors.dependent_id ? "border-red-300" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Dependent</option>
                    {dependents.map((dependent) => (
                      <option key={dependent.id} value={dependent.id}>
                        {dependent.first_name} {dependent.last_name} (
                        {dependent.relationship})
                      </option>
                    ))}
                  </select>
                )}
                {errors.dependent_id && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.dependent_id}
                  </p>
                )}
              </div>
            )}

            {/* Amount */}
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount Requested (KSH) *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary font-bold">
                  KSH
                </span>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="0"
                  max={selectedGrantType?.max_amount || ""}
                  step="100"
                  className={`block w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:font-light ${
                    errors.amount ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter amount"
                />
              </div>
              {selectedGrantType && (
                <p className="text-sm text-gray-500">
                  Maximum allowed: KSH {selectedGrantType.max_amount}
                </p>
              )}
              {errors.amount && (
                <p className="text-sm text-red-600 mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700"
              >
                Reason for Application *
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={4}
                className={`block w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:font-light ${
                  errors.reason ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Explain why you need this grant (minimum 20 characters)"
              />
              <p className="text-sm text-gray-500">
                {formData.reason.length}/500 characters
              </p>
              {errors.reason && (
                <p className="text-sm text-red-600 mt-1">{errors.reason}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex justify-center gap-3 border-t border-gray-200 z-50">
              <UniversalButton
                title={isSubmitting ? "Submitting..." : "Submit Application"}
                handleClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg font-medium shadow-md transition-colors"
                disabled={
                  isSubmitting || loadingGrantTypes || loadingDependents
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyForGrantComponent;
