import { FilesUploader } from "@/components";
import { useRegister } from "@/context/UserRegisterContext";
import useServerSideQueries from "@/hooks/useServerSideQueries";

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
      <div>
        <h2 className="text-xl font-bold text-dark">Profile photo</h2>
        <p className="text-dark/70 text-sm mt-1">
          Upload a clear passport photo for verification
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <FilesUploader
          label="Passport image"
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
