import { FloatingInput } from "@/components";
import { useRegister } from "@/context/UserRegisterContext";
import { FaUser, FaPhone, FaVenusMars } from "react-icons/fa";

const RegisterStepOne = () => {
  const { formData, setFormData, formErrors, handleChange } = useRegister();

  return (
    <section className="space-y-6">
      <div className="pt-1">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-2 border border-blue-200">
            <FaUser className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-dark">Personal Information</h2>
            <p className="text-dark/60 text-sm">Tell us about yourself</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FloatingInput
            id="first_name"
            name="first_name"
            label="First Name"
            value={formData.first_name}
            onChange={handleChange}
            error={formErrors.first_name}
          />
          <FloatingInput
            id="middle_name"
            name="middle_name"
            label="Middle Name"
            value={formData.middle_name}
            onChange={handleChange}
            error={formErrors.middle_name}
          />
        </div>

        <FloatingInput
          id="last_name"
          name="last_name"
          label="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          error={formErrors.last_name}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FloatingInput
            id="phone_number"
            name="phone_number"
            label="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            error={formErrors.phone_number}
          />

          <div>
            <label className="block text-sm font-medium text-dark/70 mb-2 flex items-center">
              <FaVenusMars className="mr-2 text-primary" />
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                formErrors.gender
                  ? "border-red-300 focus:border-red-300"
                  : "border-gray-300 focus:border-transparent"
              }`}
              value={formData.gender}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formErrors.gender && (
              <p className="text-red-500 text-xs mt-1">{formErrors.gender}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterStepOne;
