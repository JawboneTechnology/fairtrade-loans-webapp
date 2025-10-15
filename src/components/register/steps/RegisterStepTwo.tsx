import { FloatingInput } from "@/components";
import { useRegister } from "@/context/UserRegisterContext";

const RegisterStepTwo = () => {
  const { formData, formErrors, handleChange } = useRegister();

  return (
    <>
      <h1 className="text-lg font-bold flex items-center">Address Details</h1>

      <div className="flex flex-col space-y-5 w-full">
        <FloatingInput
          id="address"
          name="address"
          label="Address"
          value={formData.address}
          onChange={handleChange}
          error={formErrors.address}
        />
        <FloatingInput
          id="email"
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
        />
        <FloatingInput
          id="dob"
          type="date"
          name="dob"
          label="Date of Birth"
          value={
            formData.dob instanceof Date
              ? formData.dob.toISOString().split("T")[0]
              : formData.dob
          }
          onChange={handleChange}
          error={
            formErrors.dob instanceof Date
              ? formErrors.dob.toISOString()
              : formErrors.dob
          }
        />
        <FloatingInput
          id="national_id"
          name="national_id"
          label="National ID"
          value={formData.national_id.toString() || ""}
          onChange={handleChange}
          error={
            formErrors.national_id ? String(formErrors.national_id) : undefined
          }
        />
      </div>
    </>
  );
};

export default RegisterStepTwo;
