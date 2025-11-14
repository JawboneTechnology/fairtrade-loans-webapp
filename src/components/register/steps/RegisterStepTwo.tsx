import { FloatingInput } from "@/components";
import { useRegister } from "@/context/UserRegisterContext";
import { FaMapMarkerAlt, FaEnvelope, FaCalendarAlt, FaIdCard } from "react-icons/fa";

const RegisterStepTwo = () => {
  const { formData, formErrors, handleChange } = useRegister();

  const calculateMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <section className="space-y-6">
      <div className="pt-1">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-2 border border-green-200">
            <FaMapMarkerAlt className="text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-dark">Address & Contact</h2>
            <p className="text-dark/60 text-sm">How can we reach you?</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
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
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            max={calculateMaxDate()}
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
