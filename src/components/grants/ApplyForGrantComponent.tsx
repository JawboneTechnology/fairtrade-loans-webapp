import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/UseAuthStore";
import { useGrants } from "@/context/GrantsContext";
import { SkeletonTheme } from "react-loading-skeleton";
import { useDependents } from "@/context/DependentContext";
import { GrantApplicationSkeleton } from "@/components";
import {
  FaCheck,
  FaArrowLeft,
  FaInfoCircle,
  FaGift,
  FaUsers,
  FaFileAlt,
  FaDollarSign,
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
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-white to-primary/5">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-secondary to-secondary/80 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-dark/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-dark/10 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10 flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-dark/10 hover:bg-dark/20 backdrop-blur-sm border border-dark/20 text-dark font-semibold p-3 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            <FaArrowLeft className="text-lg" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="bg-dark/10 rounded-2xl p-3">
              <FaGift className="text-2xl text-dark" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-dark">Apply for Grant</h1>
              <p className="text-dark/80">Submit your grant application</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 pb-[120px]">
        {/* Application Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mt-6 space-y-8">
          {/* Grant Type Selection */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-primary/10 rounded-2xl p-2">
                  <FaGift className="text-primary text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-dark">Grant Type</h2>
              </div>
              <p className="text-dark/70 text-lg">
                Choose the grant type that best fits your needs
              </p>
            </div>

            {loadingGrantTypes ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="animate-pulse bg-gray-200 rounded-2xl h-32"></div>
                <div className="animate-pulse bg-gray-200 rounded-2xl h-32"></div>
              </div>
            ) : grantTypes.length === 0 ? (
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-6 text-center">
                <FaInfoCircle className="mx-auto text-amber-600 text-3xl mb-3" />
                <p className="text-amber-800 font-medium">
                  No available grant types found. Please try again later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-200 transform hover:scale-[1.02] active:scale-95 ${
                      formData.grant_type_id === grantType.id
                        ? "border-primary bg-gradient-to-r from-primary/5 to-primary/10 shadow-xl"
                        : "border-gray-200 hover:border-primary/30 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-3 rounded-2xl ${
                            formData.grant_type_id === grantType.id
                              ? "bg-primary/20"
                              : "bg-gray-100"
                          }`}
                        >
                          <FaGift
                            className={`text-xl ${
                              formData.grant_type_id === grantType.id
                                ? "text-primary"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                        <h3 className="font-bold text-lg text-dark">
                          {grantType.name}
                        </h3>
                      </div>
                      {formData.grant_type_id === grantType.id && (
                        <div className="bg-primary rounded-full p-2">
                          <FaCheck className="text-white text-sm" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FaDollarSign className="text-secondary text-sm" />
                        <span className="text-dark/80 font-medium">
                          Max amount:{" "}
                          <span className="font-bold text-dark">
                            KSH {grantType.max_amount}
                          </span>
                        </span>
                      </div>

                      {grantType.requires_dependent && (
                        <div className="flex items-center space-x-2 bg-primary/10 rounded-xl p-3">
                          <FaUsers className="text-primary text-sm" />
                          <span className="text-primary font-medium text-sm">
                            Requires family member selection
                          </span>
                        </div>
                      )}
                    </div>
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
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-primary/10 rounded-2xl p-2">
                    <FaUsers className="text-primary text-lg" />
                  </div>
                  <h2 className="text-2xl font-bold text-dark">
                    Select Family Member
                  </h2>
                </div>
                <p className="text-dark/70 text-lg">
                  Choose the family member who will benefit from this grant
                </p>
              </div>

              {loadingDependents ? (
                <div className="animate-pulse bg-gray-200 rounded-2xl h-16"></div>
              ) : dependents.length === 0 ? (
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-6 text-center">
                  <FaUsers className="mx-auto text-amber-600 text-3xl mb-3" />
                  <p className="text-amber-800 font-medium mb-4">
                    No family members found. Add a dependent to continue with
                    your application.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/create-dependant")}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl"
                  >
                    <FaUsers className="text-lg" />
                    <span>Add Family Member</span>
                  </button>
                </div>
              ) : (
                <select
                  name="dependent_id"
                  value={formData.dependent_id}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-dark font-medium transition-all ${
                    errors.dependent_id ? "border-red-300" : "border-gray-200"
                  }`}
                >
                  <option value="">Choose a family member</option>
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
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-secondary/20 rounded-2xl p-2">
                  <FaDollarSign className="text-dark text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-dark">Request Amount</h2>
              </div>
              <p className="text-dark/70 text-lg">
                Enter the amount you need for this grant
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                  <span className="text-primary font-bold text-lg">KSH</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="0"
                  max={selectedGrantType?.max_amount || ""}
                  step="100"
                  className={`block w-full pl-20 pr-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-dark font-semibold text-lg transition-all ${
                    errors.amount ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="0"
                />
              </div>

              {selectedGrantType && (
                <div className="mt-4 p-4 bg-white rounded-2xl border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <FaInfoCircle className="text-primary text-sm" />
                    <span className="text-dark/80 font-medium">
                      Maximum allowed:{" "}
                      <span className="font-bold text-dark">
                        KSH {selectedGrantType.max_amount}
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {errors.amount && (
              <p className="text-red-600 font-medium flex items-center space-x-2">
                <FaInfoCircle className="text-sm" />
                <span>{errors.amount}</span>
              </p>
            )}
          </div>

          {/* Reason */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-primary/10 rounded-2xl p-2">
                  <FaFileAlt className="text-primary text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-dark">
                  Reason for Grant
                </h2>
              </div>
              <p className="text-dark/70 text-lg">
                Explain why you need this financial assistance
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={6}
                maxLength={500}
                className={`block w-full px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-dark font-medium transition-all resize-none ${
                  errors.reason ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Please provide a detailed explanation of why you need this grant. Include specific circumstances and how the grant will help you or your family member. (Minimum 20 characters required)"
              />

              <div className="mt-4 flex justify-between items-center">
                <div
                  className={`text-sm font-medium ${
                    formData.reason.length < 20
                      ? "text-amber-600"
                      : formData.reason.length > 450
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {formData.reason.length}/500 characters
                  {formData.reason.length < 20 && (
                    <span className="ml-2 text-amber-600">
                      ({20 - formData.reason.length} more needed)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {errors.reason && (
              <p className="text-red-600 font-medium flex items-center space-x-2">
                <FaInfoCircle className="text-sm" />
                <span>{errors.reason}</span>
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 p-6 z-50">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || loadingGrantTypes || loadingDependents}
              className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 ${
                isSubmitting || loadingGrantTypes || loadingDependents
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary hover:to-secondary text-dark"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <FaGift className="text-xl" />
                  <span>Submit Grant Application</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForGrantComponent;
