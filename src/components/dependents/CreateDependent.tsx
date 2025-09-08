import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaArrowLeft, FaSave } from "react-icons/fa";
import { Spinner, UniversalButton } from "@/components";
import { useDependents } from "@/context/DependentContext";
import { BiSolidContact } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";

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
    <div className="h-full p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="fixed top-5 sm:top-10 w-full max-w-[90%] sm:max-w-[80%] mx-auto z-20 ml-3 sm:ml-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary bg-secondary px-5 py-2 rounded-full hover:text-gray-800"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 p-6 pb-[100px] mt-16">
          <h1 className="text-2xl font-bold text-gray-800">
            Add New Dependent
          </h1>

          <div className="h-8"></div>

          <div className="">
            <div className="space-y-6">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-lg font-medium text-primary mb-4 flex items-center">
                  <FaUser className="mr-2 text-primary" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.first_name ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                    {errors.first_name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.first_name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.last_name ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                    {errors.last_name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.last_name}
                      </p>
                    )}
                  </div>
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
                      className={`w-full px-3 py-3 border ${
                        errors.gender ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
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
                      className={`w-full px-3 py-2 border ${
                        errors.date_of_birth
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
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
                <h2 className="text-lg font-medium text-primary mb-4 flex items-center">
                  <BiSolidContact className="mr-2 text-primary" />
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.phone ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Relationship Section */}
              <div>
                <h2 className="text-lg font-medium text-primary mb-4 flex items-center">
                  <IoMdContacts className="mr-2 text-primary text-2xl" />
                  Relationship
                </h2>
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
                    className={`w-full px-3 py-3 border ${
                      errors.relationship ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
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

              <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex justify-center gap-3 border-t border-gray-200 z-10">
                <UniversalButton
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-[180px]"
                  title={"Cancel"}
                  handleClick={() => navigate(-1)}
                />
                <UniversalButton
                  className="bg-primary hover:bg-primary-dark w-full text-white rounded-md py-2 sm:w-1/2"
                  title={!loading && "Save Dependent"}
                  handleClick={handleSubmit}
                  disabled={isSubmitting}
                  icon={
                    loading ? (
                      <Spinner size="md" color="white" />
                    ) : (
                      <FaSave className="ml-2" />
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDependent;
