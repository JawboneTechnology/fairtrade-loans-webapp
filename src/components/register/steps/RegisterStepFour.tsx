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
    <div className="w-full">
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
  );
};

export default RegisterStepFour;
