import { FloatingInput } from "@/components";
import { useRegister } from "@/context/UserRegisterContext";

const RegisterStepOne = () => {
  const { formData, setFormData, formErrors, handleChange } = useRegister();

  return (
    <>
      <h1 className="text-lg font-bold flex items-center">
        Personal Information
      </h1>

      <div className="flex flex-col space-y-5 w-full">
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
        <FloatingInput
          id="last_name"
          name="last_name"
          label="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          error={formErrors.last_name}
        />
        <FloatingInput
          id="phone_number"
          name="phone_number"
          label="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          error={formErrors.phone_number}
        />

        {/* Gender Select Input */}
        <div className="w-full">
          <select
            id="gender"
            name="gender"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.gender}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                gender: e.target.value,
              }))
            }
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default RegisterStepOne;
