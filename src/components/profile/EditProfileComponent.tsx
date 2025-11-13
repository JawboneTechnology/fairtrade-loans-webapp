import {
  Modal,
  Spinner,
  FloatingInput,
  FilesUploader,
  AccountDeleteConsent,
} from "@/components";
import { useState } from "react";
import { RiRefreshLine } from "react-icons/ri";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useServerSideQueries from "@/hooks/useServerSideQueries";
import { useUserAccount } from "@/context/UserAccountContext";

const EditProfileComponent = () => {
  const navigate = useNavigate();
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
      <div className="min-h-screen">
        {/* Header Section with Gradient Background */}
        <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 pb-8 pt-12 px-4 rounded-b-3xl shadow-xl">
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-secondary/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-light/10 rounded-full blur-lg"></div>

          {/* Header Content */}
          <div className="relative z-10">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-white hover:text-white/80 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 py-2 rounded-full mb-6 transition-all duration-200 active:scale-95 border border-white/20"
            >
              <HiArrowNarrowLeft className="mr-2 text-xl" />
              Back
            </button>

            {/* Title Section */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                  <FaUserEdit className="text-3xl text-white" />
                </div>
              </div>
              <h1 className="text-white font-bold text-2xl sm:text-3xl mb-2">
                Edit Profile
              </h1>
              <p className="text-white/80 text-sm">
                Update your personal information
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 -mt-4 relative z-10 pb-32">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">

            {/* Profile Picture Section */}
            <div className="mb-6">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-dark mb-1">
                  Profile Picture
                </h2>
                <p className="text-sm text-dark/60">
                  Upload a clear passport image (Max 2MB)
                </p>
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
            </div>

            {/* Personal Information Section */}
            <div className="mb-6">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-dark mb-1">
                  Personal Information
                </h2>
                <p className="text-sm text-dark/60">
                  Update your personal details
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Update Button at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-[90%] sm:max-w-[80%] mx-auto p-4">
          <button
            onClick={toggleShowUpdateConfirm}
            disabled={loadingProfileUpdate}
            className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center space-x-2 ${loadingProfileUpdate
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
              }`}
          >
            {loadingProfileUpdate ? (
              <>
                <Spinner size="sm" color="text-white" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <RiRefreshLine className="text-lg" />
                <span>Update Profile</span>
              </>
            )}
          </button>
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
