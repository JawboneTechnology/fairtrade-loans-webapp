import { FloatingInput } from "@/components";
import { useRegister } from "@/context/UserRegisterContext";

const RegisterStepThree = () => {
  const { formData, formErrors, handleChange } = useRegister();

  return (
    <>
      <h1 className="text-lg font-bold flex items-center">
        Employment Details
      </h1>

      <div className="flex flex-col space-y-5 w-full">
        <FloatingInput
          id="salary"
          name="salary"
          label="Your Salary"
          value={formData.salary}
          onChange={handleChange}
          error={formErrors.salary}
        />
        <FloatingInput
          id="years_of_employment"
          name="years_of_employment"
          label="Years of Employment (Example: 1,2,3)"
          value={formData.years_of_employment}
          onChange={handleChange}
          error={formErrors.years_of_employment}
        />
        <FloatingInput
          id="old_employee_id"
          name="old_employee_id"
          label="Employment Number (Example: M00001)"
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
    </>
  );
};

export default RegisterStepThree;
