import { FloatingInput } from "@/components";
import { useRegister } from "@/context/UserRegisterContext";

const RegisterStepThree = () => {
  const { formData, formErrors, handleChange } = useRegister();

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-dark">Employment details</h2>
        <p className="text-dark/70 text-sm mt-1">
          Work information used for verification
        </p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col space-y-4 w-full">
          <FloatingInput
            id="salary"
            name="salary"
            label="Monthly salary"
            value={formData.salary}
            onChange={handleChange}
            error={formErrors.salary}
          />
          <FloatingInput
            id="years_of_employment"
            name="years_of_employment"
            label="Years of employment"
            value={formData.years_of_employment}
            onChange={handleChange}
            error={formErrors.years_of_employment}
          />
          <FloatingInput
            id="old_employee_id"
            name="old_employee_id"
            label="Employment number"
            value={formData.old_employee_id}
            onChange={handleChange}
            error={formErrors.old_employee_id}
          />
          <FloatingInput
            id="password"
            name="password"
            label="Account password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            isPassword={true}
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterStepThree;
