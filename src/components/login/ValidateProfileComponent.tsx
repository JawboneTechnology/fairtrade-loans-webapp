import { useLogin } from "@/context/UserLoginContext";
import { CompanyIcon } from "@/constants/ImageConstants";
import {
  Spinner,
  FloatingInput,
  FilesUploader,
  DebugComponent,
  UniversalButton,
} from "@/components";
import { useEffect } from "react";
import { RiRefreshLine } from "react-icons/ri";
import useAuthStore from "@/store/UseAuthStore";
import useServerSideQueries from "@/hooks/useServerSideQueries";
import { useNavigate } from "react-router-dom";

const ValidateProfileComponent = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const {
    loading,
    profileData,
    setProfileData,
    handleUpdateProfile,
    profileValidationErrors,
    handleRemoveProfileImage,
    handleProfileInputChange,
  } = useLogin();
  const { uploadImages } = useServerSideQueries();

  useEffect(() => {
    if (user && user?.id !== "") {
      setProfileData((prev) => ({
        ...prev,
        first_name: user.first_name || "",
        middle_name: user.middle_name || null,
        last_name: user.last_name || "",
        address: user?.address || "",
        dob: user?.dob || new Date(),
        passport: user?.passport || "",
        gender: user?.gender || "",
        passport_image: user?.passport_image || "",
        years_of_employment: user?.years_of_employment || "",
        salary: user?.salary || 0,
      }));
    } else {
      navigate("/auth-login");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center bg-background">
      <div className="bg-white rounded-md w-full shadow-sm overflow-y-auto">
        <div className="w-full max-w-[90%] mx-auto border rounded-xl p-5 my-10">
          <div className="text-center p-5 mb-5">
            {/* Company Logo */}
            <img
              src={CompanyIcon}
              alt="Company Logo"
              className="w-[100px] mx-auto mb-3"
            />
            <h1 className="text-2xl font-bold">Complete Profile</h1>
            {/* Welcoming Text */}
            <p className="text-gray-500 mt-2 text-center w-full sm:max-w-[80%] mx-auto">
              Welcome back! Dennis Otieno Please provide the missing information
              below and update your profile before you can proceed
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            <div>
              <FloatingInput
                id="firstName"
                name="first_name"
                label="First Name"
                value={profileData.first_name}
                onChange={handleProfileInputChange}
                className="mb-1 [&>input]:px-4 [&>input]:py-3 [&>input]:text-lg w-full"
                error={profileValidationErrors.first_name}
              />
            </div>

            <div>
              <FloatingInput
                id="middleName"
                name="middle_name"
                label="Middle Name"
                value={profileData.middle_name || ""}
                onChange={handleProfileInputChange}
                className="mb-1 [&>input]:px-4 [&>input]:py-3 [&>input]:text-lg w-full"
                error={profileValidationErrors.middle_name}
              />
            </div>

            <div>
              <FloatingInput
                id="lastName"
                name="last_name"
                label="Last Name"
                value={profileData.last_name}
                onChange={handleProfileInputChange}
                className="mb-1 [&>input]:px-4 [&>input]:py-3 [&>input]:text-lg w-full"
                error={profileValidationErrors.last_name}
              />
            </div>

            <div>
              <FloatingInput
                id="address"
                name="address"
                label="Address"
                value={profileData.address}
                onChange={handleProfileInputChange}
                className="mb-1 [&>input]:px-4 [&>input]:py-3 [&>input]:text-lg w-full"
                error={profileValidationErrors.address}
              />
            </div>

            <div>
              <FloatingInput
                id="dob"
                type="date"
                name="dob"
                label="Date of Birth"
                value={
                  profileData.dob instanceof Date
                    ? profileData.dob.toISOString().split("T")[0]
                    : profileData.dob
                }
                onChange={handleProfileInputChange}
                className="mb-1 [&>input]:px-4 [&>input]:py-3 [&>input]:text-lg w-full"
                error={
                  profileValidationErrors.dob
                    ? profileValidationErrors.dob.toString()
                    : null
                }
              />
            </div>

            <div>
              <FloatingInput
                id="gender"
                name="gender"
                label="Gender"
                value={profileData.gender}
                onChange={handleProfileInputChange}
                className="mb-1 [&>input]:px-4 [&>input]:py-3 [&>input]:text-lg w-full"
                error={profileValidationErrors.gender}
              />
            </div>

            <div>
              <FloatingInput
                id="yearOfEmployment"
                name="years_of_employment"
                label="Years of Employment (Example 1,3,5...)"
                value={profileData.years_of_employment || ""}
                onChange={handleProfileInputChange}
                className="mb-1 [&>input]:px-4 [&>input]:py-3 [&>input]:text-lg w-full"
                error={profileValidationErrors.years_of_employment}
              />
            </div>

            <div>
              <FloatingInput
                id="salary"
                name="salary"
                label="Salary"
                value={profileData.salary.toString() || ""}
                onChange={handleProfileInputChange}
                className="mb-1 [&>input]:px-4 [&>input]:py-3 [&>input]:text-lg w-full"
                error={
                  profileValidationErrors.salary
                    ? profileValidationErrors.salary.toString()
                    : null
                }
              />
            </div>
          </div>

          <div className="mt-5">
            <FilesUploader
              label="Upload Profile Picture"
              description="Upload a passport image of yourself. The image should be clear and should not exceed 2MB"
              acceptedFormats="image/*"
              uploadHandler={uploadImages}
              existingImage={profileData?.passport_image}
              removeHandler={handleRemoveProfileImage}
              setContextData={(imageUrl) =>
                setProfileData((prev) => ({
                  ...prev,
                  passport_image: imageUrl,
                }))
              }
            />
          </div>

          <div className="mt-5 flex justify-start">
            <UniversalButton
              className="bg-primary hover:bg-primary-dark w-full sm:w-[200px] text-white rounded-md py-2 text-lg"
              title={loading ? "Updating..." : "Update profile"}
              handleClick={() => handleUpdateProfile()}
              disabled={loading}
              icon={
                loading ? (
                  <Spinner size="sm" color="text-white mr-2" />
                ) : (
                  <RiRefreshLine className="w-5 h-5" />
                )
              }
            />
          </div>

          <DebugComponent title="Profile Details" debugData={profileData} />
        </div>
      </div>
    </div>
  );
};

export default ValidateProfileComponent;
