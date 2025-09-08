import {
  Modal,
  Spinner,
  FloatingInput,
  FilesUploader,
  UniversalButton,
  AccountDeleteConsent,
} from "@/components";
import { useState } from "react";
import { RiRefreshLine } from "react-icons/ri";
import { HiArrowNarrowLeft } from "react-icons/hi";
import useServerSideQueries from "@/hooks/useServerSideQueries";
import { useUserAccount } from "@/context/UserAccountContext";

const EditProfileComponent = () => {
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const toggleShowUpdateConfirm = () => setShowUpdateConfirm((prev) => !prev);
  const { uploadImages } = useServerSideQueries();
  const {
    profileDetails,
    setProfileDetails,
    handleInputChange,
    handleUpdateProfile,
    loadingProfileUpdate,
    profileValidationErrors,
    handleRemoveProfileImage,
  } = useUserAccount();

  return (
    <>
      <div className="fixed top-6 left-5 z-10">
        {/* Back Button */}
        <button
          className="flex items-center text-primary hover:text-gray-700 bg-secondary hover:bg-light-hover px-6 py-2 rounded-full"
          onClick={() => window.history.back()}
        >
          <HiArrowNarrowLeft className="mr-2 text-2xl" />
          Back
        </button>
      </div>

      <div className="w-full max-w-[90%] sm:max-w-[80%] mx-auto overflow-y-auto mt-20 sm:mt-20">
        <div className="bg-white rounded-t-lg p-6 border-l border-r border-gray-200 pb-[200px]">
          <div className="flex items-center gap-5 mb-5">
            <h1 className="text-2xl text-black font-bold text-left">
              Edit my profile
            </h1>
          </div>

          <FilesUploader
            label="Upload profile picture"
            description="Upload a clear passport image (Max 2MB)."
            acceptedFormats="image/*"
            uploadHandler={uploadImages}
            existingImage={profileDetails?.passport_image}
            removeHandler={handleRemoveProfileImage}
            setContextData={(imageUrl) =>
              setProfileDetails((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  passport_image: imageUrl,
                };
              })
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
            <FloatingInput
              id="first_name"
              name="first_name"
              label="First Name"
              value={profileDetails?.first_name || ""}
              onChange={handleInputChange}
              error={profileValidationErrors.first_name}
            />
            <FloatingInput
              id="middle_name"
              name="middle_name"
              label="Middle Name"
              value={profileDetails?.middle_name || ""}
              onChange={handleInputChange}
              error={profileValidationErrors.middle_name}
            />
            <FloatingInput
              id="last_name"
              name="last_name"
              label="Last Name"
              value={profileDetails?.last_name || ""}
              onChange={handleInputChange}
              error={profileValidationErrors.last_name}
            />
            <FloatingInput
              id="phone_number"
              name="phone_number"
              label="Phone Number"
              value={profileDetails?.phone_number || ""}
              onChange={handleInputChange}
              error={profileValidationErrors.phone_number}
            />
            <FloatingInput
              id="email"
              name="email"
              label="Email"
              value={profileDetails?.email || ""}
              onChange={handleInputChange}
              error={profileValidationErrors.email}
            />
            <FloatingInput
              id="address"
              name="address"
              label="Address"
              value={profileDetails?.address || ""}
              onChange={handleInputChange}
              error={profileValidationErrors.address}
            />
            <FloatingInput
              id="dob"
              name="dob"
              type="date"
              label="Date of Birth"
              value={profileDetails?.dob || ""}
              onChange={handleInputChange}
              error={
                profileValidationErrors.dob
                  ? profileValidationErrors.dob.toString()
                  : ""
              }
            />
            <FloatingInput
              id="gender"
              name="gender"
              label="Gender"
              value={profileDetails?.gender || ""}
              onChange={handleInputChange}
              error={profileValidationErrors.gender}
            />
            <FloatingInput
              id="years_of_employment"
              name="years_of_employment"
              label="Years of Employment"
              value={profileDetails?.years_of_employment || ""}
              onChange={handleInputChange}
              error={profileValidationErrors.years_of_employment}
            />
            <FloatingInput
              id="salary"
              name="salary"
              label="Salary"
              value={profileDetails?.salary || ""}
              onChange={handleInputChange}
              error={
                profileValidationErrors.salary
                  ? profileValidationErrors.salary.toString()
                  : ""
              }
            />
          </div>

          <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex justify-center border-t border-gray-200">
            <UniversalButton
              className="bg-primary hover:bg-primary-dark w-full sm:w-[200px] text-white rounded-md py-2 text-lg"
              title={loadingProfileUpdate ? "Updating..." : "Update Profile"}
              handleClick={toggleShowUpdateConfirm}
              disabled={loadingProfileUpdate}
              icon={
                loadingProfileUpdate ? (
                  <Spinner size="sm" color="text-white mr-2" />
                ) : (
                  <RiRefreshLine className="w-5 h-5" />
                )
              }
            />
          </div>
        </div>
      </div>

      {showUpdateConfirm && (
        <Modal onClose={toggleShowUpdateConfirm} className="w-full sm:w-[50%]">
          <AccountDeleteConsent
            title="Confirm Profile Update"
            description="Are you sure you want to update your profile? Before continuing please make sure you have updated your profile Image."
            onClose={toggleShowUpdateConfirm}
            handleAction={() => handleUpdateProfile(toggleShowUpdateConfirm)}
            loading={loadingProfileUpdate}
          />
        </Modal>
      )}
    </>
  );
};

export default EditProfileComponent;
