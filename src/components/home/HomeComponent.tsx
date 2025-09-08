import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { BsInfoCircle } from "react-icons/bs";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import useAuthStore from "@/store/UseAuthStore";
import { VscGitStashApply } from "react-icons/vsc";
import { IoMdNotifications } from "react-icons/io";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FcAdvertising } from "react-icons/fc";
import "react-loading-skeleton/dist/skeleton.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useUserAccount } from "@/context/UserAccountContext";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import { Modal, UniversalButton, CircularProgressBar } from "@/components";
import { useNotification } from "@/context/NotificationContext";

const HomeComponent = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();
  const { notifications } = useNotification();
  const {
    loadingRecentLoan,
    recentLoanInformation,
    fetchRecentLoanInformation,
  } = useUserAccount();
  const { formatCurrency } = useCurrencyFormatter();
  const [showFeatureModal, setShowFeatureModal] = useState<boolean>(false);
  const { calculations } = recentLoanInformation || {};
  const {
    id,
    applied_at,
    loan_number,
    loan_amount,
    amount_paid,
    loan_type_name,
    outstanding_amount,
    percentage_complete,
  } = calculations || {};

  const toggleShowFeatureModal = () => setShowFeatureModal((prev) => !prev);

  useEffect(() => {
    fetchRecentLoanInformation();
  }, []);

  return (
    <>
      <div className="w-full max-w-[90%] sm:max-w-[80%] mx-auto overflow-y-auto pb-[200px]">
        {/* User Profile and Notification */}
        <section className="w-full flex justify-between items-center mb-10 pt-10">
          <div className="flex items-center gap-3">
            {profile ? (
              <img
                src={profile}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-white bg-white"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <FaCircleUser className="text-5xl text-white" />
              </div>
            )}

            <div>
              <h5 className="text-white font-semibold text-xl leading-none">
                {loadingRecentLoan ? (
                  <Skeleton width={150} height={24} />
                ) : (
                  `Hello ${user?.first_name},`
                )}
              </h5>
              <p className="text-white text-sm">
                {loadingRecentLoan ? <Skeleton width={100} /> : "Welcome Back!"}
              </p>
            </div>
          </div>

          <div className="relative">
            <button onClick={() => navigate("/notifications")}>
              <IoMdNotifications className="text-3xl text-secondary cursor-pointer hover:text-gray-300 transition" />
            </button>

            {notifications.length > 0 && (
              <span className="absolute -top-3 right-3 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {
                  notifications.filter((notification) => !notification.is_read)
                    .length
                }
              </span>
            )}
          </div>
        </section>

        {/* Loan Overview */}
        <section className="bg-white border border-gray-200 rounded-xl flex flex-col items-center py-5">
          <h3 className="text-2xl font-semibold mb-5 flex items-center gap-2">
            {loadingRecentLoan ? (
              <Skeleton width={200} height={30} />
            ) : loan_type_name ? (
              loan_type_name + " Overview"
            ) : (
              "No Loan Available"
            )}{" "}
          </h3>

          {loadingRecentLoan ? (
            <Skeleton circle height={250} width={250} />
          ) : (
            <CircularProgressBar
              labelSize="50px"
              completed={percentage_complete || 0}
              height="250px"
              isLabelVisible
            />
          )}

          {/* Loan Details */}
          <div className="w-full mt-5">
            <div className="flex justify-between px-5">
              <div className="p-3 flex flex-col items-center">
                <h5 className="font-semibold">Outstanding</h5>
                <p className="text-gray-500 text-xl">
                  {loadingRecentLoan ? (
                    <Skeleton width={100} height={24} />
                  ) : outstanding_amount ? (
                    formatCurrency(Number(outstanding_amount))
                  ) : (
                    "----"
                  )}
                </p>
              </div>

              <div className="p-3 flex flex-col items-center">
                <h5 className="font-semibold">Amount Paid</h5>
                <p className="text-gray-500 text-xl">
                  {loadingRecentLoan ? (
                    <Skeleton width={100} height={24} />
                  ) : amount_paid ? (
                    formatCurrency(Number(amount_paid))
                  ) : (
                    "----"
                  )}
                </p>
              </div>
            </div>

            {/* View Loan Details Button && Apply For Loan Button */}
            <div className="px-5 mt-5">
              <UniversalButton
                className="bg-secondary text-dark py-2 px-5 rounded-lg w-full sm:max-w-[60%] mx-auto items-center"
                title="Apply For New Loan"
                handleClick={() => navigate("/apply-loan")}
                icon={<VscGitStashApply className="text-2xl" />}
              />
              <UniversalButton
                className="bg-primary text-white py-2 px-5 rounded-lg w-full sm:max-w-[60%] mx-auto mt-3 items-center"
                title="View Loan Details"
                handleClick={() =>
                  id
                    ? navigate("/loan-details/" + id)
                    : toast.error("No Loan Details!", {
                        description:
                          "Please apply for a loan before you can be able to view details",
                        duration: 5000,
                      })
                }
                icon={<HiArrowNarrowRight className="text-2xl" />}
                isCustomIcon={true}
              />
            </div>

            {/* Payment Note */}
            <div className="border-t border-gray-200 flex items-start gap-2 mt-3 pt-5 px-5">
              <div className="">
                <BsInfoCircle className="text-lg text-primary mt-1" />
              </div>
              <p className="text-gray-500 text-sm">
                {loadingRecentLoan ? (
                  <Skeleton width={300} height={16} />
                ) : amount_paid && loan_amount && applied_at && loan_number ? (
                  `Keep going! You've repaid ${formatCurrency(
                    Number(amount_paid)
                  )} of ${formatCurrency(
                    Number(loan_amount)
                  )} for Loan #${loan_number}, applied on ${
                    applied_at
                      ? new Date(applied_at).toLocaleDateString()
                      : "N/A"
                  }.`
                ) : (
                  "Get your first loan todays with flexible payments of up to 24 months. For more information please contact us."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-10 pb-10">
          <h3 className="text-2xl font-semibold mb-5">Quick Actions</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div
              onClick={() => navigate("/loans")}
              className="bg-white rounded-xl p-5 flex items-center gap-3 border border-gray-200 hover:shadow-md transition cursor-pointer"
            >
              <GiReceiveMoney className="text-3xl text-primary" />
              <div>
                <h5 className="font-semibold">Apply for a Loan</h5>
                <p className="text-gray-500">Get a loan in minutes</p>
              </div>
            </div>

            <div
              onClick={() => navigate("/payments")}
              className="bg-white rounded-xl p-5 flex items-center gap-3 border border-gray-200 hover:shadow-md transition cursor-pointer"
            >
              <FaMoneyCheckAlt className="text-3xl text-primary" />
              <div>
                <h5 className="font-semibold">View Transactions</h5>
                <p className="text-gray-500">View all your transactions</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showFeatureModal && (
        <Modal onClose={toggleShowFeatureModal} className="w-full sm:w-[50%]">
          <div className="p-10 w-[95%] mx-auto bg-white rounded-xl">
            <div className="flex items-center justify-center mb-5">
              <FcAdvertising className="text-[100px]" />
            </div>

            <h3 className="text-2xl font-semibold text-center">Coming Soon!</h3>
            <p className="mt-2 text-gray-600 text-center">
              This feature is currently in development and will be available
              soon.
            </p>

            <div className="mt-5">
              <UniversalButton
                className="bg-primary hover:bg-primary-dark w-full text-white rounded-full py-2 text-lg"
                title="Ok"
                handleClick={toggleShowFeatureModal}
                icon={<IoCloseCircleOutline className="text-xl" />}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default HomeComponent;
