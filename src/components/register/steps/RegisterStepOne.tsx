import { FloatingInput } from "@/components";
import { useRegister } from "@/context/UserRegisterContext";

const RegisterStepOne = () => {
  const { formData, setFormData, formErrors, handleChange } = useRegister();

  return (
    <section className="space-y-6">
      <div className="pt-1">
        <h2 className="text-xl font-bold text-dark">Personal information</h2>
        <p className="text-dark/70 text-sm mt-1">Tell us about yourself</p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col space-y-4 w-full">
          <FloatingInput
            id="first_name"
            name="first_name"
            label="First name"
            value={formData.first_name}
            onChange={handleChange}
            error={formErrors.first_name}
          />
          <FloatingInput
            id="middle_name"
            name="middle_name"
            label="Middle name"
            value={formData.middle_name}
            onChange={handleChange}
            error={formErrors.middle_name}
          />
          <FloatingInput
            id="last_name"
            name="last_name"
            label="Last name"
            value={formData.last_name}
            onChange={handleChange}
            error={formErrors.last_name}
          />
          <FloatingInput
            id="phone_number"
            name="phone_number"
            label="Phone number"
            value={formData.phone_number}
            onChange={handleChange}
            error={formErrors.phone_number}
          />

          <div>
            <label className="block text-sm font-medium text-dark/70 mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary border-gray-200"
              value={formData.gender}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterStepOne;
