import { FloatingInput } from "@/components";
import { useRegister } from "@/context/UserRegisterContext";
import { FaBriefcase, FaDollarSign, FaCalendarCheck, FaIdBadge, FaLock } from "react-icons/fa";

const RegisterStepThree = () => {
  const { formData, formErrors, handleChange } = useRegister();

  return (
    <section className="space-y-6">
      <div className="pt-1">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-2 border border-purple-200">
            <FaBriefcase className="text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-dark">Employment Details</h2>
            <p className="text-dark/60 text-sm">
              Work information used for verification
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FloatingInput
            id="salary"
            name="salary"
            label="Monthly Salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            error={formErrors.salary}
          />

          <FloatingInput
            id="years_of_employment"
            name="years_of_employment"
            label="Years of Employment"
            type="number"
            value={formData.years_of_employment}
            onChange={handleChange}
            error={formErrors.years_of_employment}
          />
        </div>

        <FloatingInput
          id="old_employee_id"
          name="old_employee_id"
          label="Employment Number"
          value={formData.old_employee_id}
          onChange={handleChange}
          error={formErrors.old_employee_id}
        />

        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-200">
          <div className="flex items-center space-x-2 mb-3">
            <FaLock className="text-blue-600" />
            <h3 className="text-sm font-semibold text-dark">Account Security</h3>
          </div>
          <FloatingInput
            id="password"
            name="password"
            label="Account Password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            isPassword={true}
          />
          <p className="text-xs text-dark/60 mt-2">
            Choose a strong password with at least 8 characters
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterStepThree;
