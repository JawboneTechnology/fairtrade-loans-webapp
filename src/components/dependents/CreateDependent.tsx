import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { HiUsers } from "react-icons/hi";
import { Spinner, FloatingInput } from "@/components";
import { useDependents } from "@/context/DependentContext";

const CreateDependent = () => {
  const navigate = useNavigate();

  const {
    loading,
    errors,
    genders,
    addDependent,
    isSubmitting,
    relationships,
    calculateMaxDate,
  } = useDependents();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    gender: "",
    date_of_birth: "",
    relationship: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await addDependent(formData);
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
                  <HiUsers className="text-3xl text-white" />
                </div>
              </div>
              <h1 className="text-white font-bold text-2xl sm:text-3xl mb-2">
                Add New Dependent
              </h1>
              <p className="text-white/80 text-sm">
                Add a family member or dependent to your account
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 -mt-4 relative z-10 pb-32">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="space-y-6">
              {/* Personal Information Section */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">👤</span>
                  <h2 className="text-lg font-bold text-dark">
                    Personal Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingInput
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    type="text"
                    required
                    error={errors.first_name}
                  />
                  <FloatingInput
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    type="text"
                    required
                    error={errors.last_name}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 ${errors.gender ? "border-red-300" : "border-gray-300"
                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    >
                      <option value="">Select Gender</option>
                      {genders.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="date_of_birth"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      id="date_of_birth"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      max={calculateMaxDate()}
                      className={`w-full px-4 py-3 border-2 ${errors.date_of_birth
                        ? "border-red-300"
                        : "border-gray-300"
                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                    {errors.date_of_birth && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.date_of_birth}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">📧</span>
                  <h2 className="text-lg font-bold text-dark">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <FloatingInput
                    id="email"
                    name="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                    error={errors.email}
                  />
                  <FloatingInput
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    required
                    error={errors.phone}
                  />
                </div>
              </div>

              {/* Relationship Section */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">👥</span>
                  <h2 className="text-lg font-bold text-dark">
                    Relationship
                  </h2>
                </div>
                <div>
                  <label
                    htmlFor="relationship"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Relationship to You *
                  </label>
                  <select
                    id="relationship"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${errors.relationship ? "border-red-300" : "border-gray-300"
                      } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  >
                    <option value="">Select Relationship</option>
                    {relationships.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.relationship && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.relationship}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Action Buttons at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-[90%] sm:max-w-[80%] mx-auto p-4">
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 sm:flex-none sm:w-[180px] py-4 px-6 rounded-2xl font-semibold bg-gray-100 hover:bg-gray-200 text-dark transition-all duration-200 border border-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center space-x-2 ${isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
                }`}
            >
              {loading ? (
                <>
                  <Spinner size="sm" color="text-white" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave className="text-lg" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateDependent;
