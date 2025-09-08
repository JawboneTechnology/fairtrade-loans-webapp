import { toast } from "sonner";
import React, { useState } from "react";
import { IoMdContacts } from "react-icons/io";
import { UniversalButton } from "@/components";
import { BiSolidContact } from "react-icons/bi";
import { FaUser, FaSave } from "react-icons/fa";
import useDependentQueries from "@/hooks/useDependentQueries";
import { useDependents, Dependent } from "@/context/DependentContext";

interface EditDependentComponentProps {
  dependentData: Dependent;
  onClose: () => void;
  onSuccess: () => void;
}

const EditDependentComponent = ({
  dependentData,
  onClose,
  onSuccess,
}: EditDependentComponentProps) => {
  const { updateUserDependent } = useDependentQueries();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { errors, genders, relationships, calculateMaxDate } = useDependents();
  const [updatedDependantData, setUpdatedDependentData] =
    useState<Dependent>(dependentData);

  const handleUpdate = async (updatedData: Dependent) => {
    setIsSubmitting(true);
    const newData = {
      first_name: updatedData.first_name,
      last_name: updatedData.last_name,
      phone: updatedData.phone,
      email: updatedData.email,
      gender: updatedData.gender,
      date_of_birth: updatedData.date_of_birth,
      relationship: updatedData.relationship,
    };
    try {
      const response = await updateUserDependent(
        updatedData.id as string,
        newData
      );
      onSuccess();
      toast.success("Dependent updated!", {
        description: response.message,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error updating dependent:", error);
      toast.error("Error updating dependent", {
        description: "An error occurred while updating the dependent.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedDependentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-[80vh] overflow-y-scroll pb-10 pt-5">
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
                value={updatedDependantData.first_name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.first_name ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
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
                value={updatedDependantData.last_name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.last_name ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
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
                value={updatedDependantData.gender}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.gender ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              >
                <option value="">Select Gender</option>
                {genders.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
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
                value={updatedDependantData.date_of_birth}
                onChange={handleChange}
                max={calculateMaxDate()}
                className={`w-full px-3 py-2 border ${
                  errors.date_of_birth ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
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
                value={updatedDependantData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
                value={updatedDependantData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.phone ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
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
              value={updatedDependantData.relationship}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.relationship ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
            >
              <option value="">Select Relationship</option>
              {relationships.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.relationship && (
              <p className="mt-1 text-sm text-red-600">{errors.relationship}</p>
            )}
          </div>
        </div>

        <div className="w-full bg-white py-4 flex justify-center gap-3">
          <UniversalButton
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-[180px]"
            title={"Cancel"}
            handleClick={onClose}
          />
          <UniversalButton
            className="bg-primary hover:bg-primary-dark w-full text-white rounded-md py-2 sm:w-1/2"
            title={"Save Dependent"}
            handleClick={() => handleUpdate(updatedDependantData)}
            disabled={isSubmitting}
            icon={<FaSave className="mr-2" />}
          />
        </div>
      </div>
    </div>
  );
};

export default EditDependentComponent;
