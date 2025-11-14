import { FilesUploader } from "@/components";
import { useRegister } from "@/context/UserRegisterContext";
import useServerSideQueries from "@/hooks/useServerSideQueries";
import { FaCamera, FaInfoCircle } from "react-icons/fa";

const RegisterStepFour = () => {
  const { uploadImages } = useServerSideQueries();
  const { formData, setFormData } = useRegister();

  function handleRemoveProfileImage(): void {
    setFormData((prev) => ({
      ...prev,
      passport_image: "",
    }));
  }

  return (
    <section className="space-y-6">
      <div className="pt-1">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-2 border border-orange-200">
            <FaCamera className="text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-dark">Profile Photo</h2>
            <p className="text-dark/60 text-sm">
              Upload a clear passport photo for verification
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-6 border border-gray-200">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <div className="flex items-start space-x-3">
            <FaInfoCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-dark mb-1">
                Photo Requirements
              </p>
              <ul className="text-xs text-dark/70 space-y-1">
                <li>• Clear, front-facing passport-style photo</li>
                <li>• Maximum file size: 2MB</li>
                <li>• Accepted formats: JPG, PNG, or JPEG</li>
                <li>• Good lighting and neutral background</li>
              </ul>
            </div>
          </div>
        </div>

        <FilesUploader
          label="Passport Image"
          description="Upload a clear passport image (Max 2MB)."
          acceptedFormats="image/*"
          uploadHandler={uploadImages}
          existingImage={formData?.passport_image}
          removeHandler={handleRemoveProfileImage}
          setContextData={(imageUrl) =>
            setFormData((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                passport_image: imageUrl,
              };
            })
          }
        />
      </div>
    </section>
  );
};

export default RegisterStepFour;
