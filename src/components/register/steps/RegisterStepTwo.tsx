import { FloatingInput } from "@/components";
import { useRegister } from "@/context/UserRegisterContext";

const RegisterStepTwo = () => {
  const { formData, formErrors, handleChange } = useRegister();

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-dark">Address & contact</h2>
        <p className="text-dark/70 text-sm mt-1">How can we reach you?</p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col space-y-4 w-full">
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
            label="Email address"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
          />
          <FloatingInput
            id="dob"
            type="date"
            name="dob"
            label="Date of birth"
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
            value={formData.national_id?.toString() || ""}
            onChange={handleChange}
            error={
              formErrors.national_id
                ? String(formErrors.national_id)
                : undefined
            }
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterStepTwo;
