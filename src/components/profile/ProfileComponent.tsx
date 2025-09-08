import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaKey } from "react-icons/fa";
import { useUserAccount } from "@/context/UserAccountContext";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import useAuthStore from "@/store/UseAuthStore";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";

const ProfileComponent = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { profileDetails: user } = useUserAccount();
  const { formatCurrency } = useCurrencyFormatter();

  return (
    <>
      <div className="h-full max-w-[90%] sm:max-w-[80%] mx-auto pb-[200px] overflow-y-scroll">
        {/* Profile Section */}

        <div className="bg-white rounded-lg p-5 mt-10">
          <div className="flex flex-col items-center">
            <img
              src={user?.passport_image}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-primary"
            />
            <h2 className="text-xl font-semibold mt-3">{`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <p className="text-gray-500 text-sm">{user?.phone_number}</p>
          </div>
        </div>

        {/* Employment Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mt-5">
          <h3 className="text-lg font-semibold text-primary mb-3">
            Employment Details
          </h3>
          <div className="space-y-2">
            <p className="flex justify-between text-gray-600">
              <span>Years of Employment:</span>{" "}
              <span>{user?.years_of_employment} years</span>
            </p>
            <p className="flex justify-between text-gray-600">
              <span>Employee ID:</span> <span>{user?.employee_id}</span>
            </p>
            <p className="flex justify-between text-gray-600">
              <span>Salary:</span>{" "}
              <span>{formatCurrency(Number(user?.salary))}</span>
            </p>
          </div>
        </div>

        {/* Loan Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mt-5">
          <h3 className="text-lg font-semibold text-primary mb-3">
            Loan Information
          </h3>
          <p className="flex justify-between text-gray-600">
            <span>Loan Limit:</span>{" "}
            <span> {formatCurrency(Number(user?.loan_limit))}</span>
          </p>
        </div>

        {/* Verification Status */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mt-5 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-primary">
            Verification Status
          </h3>
          {user?.email_verified_at ? (
            <span className="text-green-500 font-semibold">Verified</span>
          ) : (
            <span className="text-red-500 font-semibold">Not Verified</span>
          )}
        </div>

        <div className="bg-white rounded-md pt-5 mt-5">
          <h3 className="text-xl font-medium pl-3">Account Management</h3>

          {/* Account Management Section */}
          <div className="mt-5 space-y-4 px-4">
            {/* Edit Account */}
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium">Edit Account</h3>
                <p className="text-xs text-gray-500">
                  Update your personal details.
                </p>
              </div>
              <button
                onClick={() => navigate("/edit-profile")}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition text-sm"
              >
                <FaEdit />
              </button>
            </div>

            {/* Account Dependents */}
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium">My Dependents</h3>
                <p className="text-xs text-gray-500">
                  Manage your dependents and their details.
                </p>
              </div>
              <button
                onClick={() => navigate("/dependent")}
                className="flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-md hover:bg-primary-dark transition text-sm"
              >
                <MdEditNote className="text-xl" />
              </button>
            </div>

            {/* Change Password */}
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium">Change Password</h3>
                <p className="text-xs text-gray-500">
                  Update your account password.
                </p>
              </div>
              <button
                onClick={() => navigate("/update-password")}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition text-sm"
              >
                <FaKey className="" />
              </button>
            </div>

            {/* Logout */}
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium">Logout</h3>
                <p className="text-xs text-gray-500">
                  Log out of your account and end your session.
                </p>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-100 text-red-500 px-4 py-2 rounded-md transition text-sm"
              >
                <RiLogoutCircleRLine className="text-lg" />
              </button>
            </div>

            {/* Delete Account */}
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium">Delete Account</h3>
                <p className="text-xs text-gray-500">
                  Permanently delete your account and data.
                </p>
              </div>
              <button
                onClick={() => navigate("/delete-account")}
                className="flex items-center gap-2 bg-red-100 text-red-500 px-4 py-2 rounded-md transition text-sm"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
