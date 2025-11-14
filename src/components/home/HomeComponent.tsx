import { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { FaMoneyCheckAlt, FaCreditCard } from "react-icons/fa";
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
import { Modal, UniversalButton, CircularProgressBar, SupportContactDrawer } from "@/components";
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

  // Support contact drawer state
  const [showSupportDrawer, setShowSupportDrawer] = useState<boolean>(false);

  const loans = recentLoanInformation?.loans || [];
  const activeLoansCount = loans.length;

  const toggleShowFeatureModal = () => setShowFeatureModal((prev) => !prev);

  // Support drawer functions
  const toggleSupportDrawer = () => setShowSupportDrawer((prev) => !prev);

  useEffect(() => {
    fetchRecentLoanInformation();
  }, []);

  return (
    <>
      <div className="min-h-screen pb-24">
        {/* Header Section with Curved Background */}
        <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 pb-8 pt-12 px-4 rounded-b-3xl shadow-xl">
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-secondary/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-light/10 rounded-full blur-lg"></div>

          {/* User Profile and Notification */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {profile ? (
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-3 border-white/20 shadow-lg"
                  />
                ) : (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
                    <FaCircleUser className="text-4xl sm:text-5xl text-white/80" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary rounded-full border-2 border-white"></div>
              </div>

              <div>
                <h1 className="text-white font-bold text-xl sm:text-2xl leading-tight">
                  {loadingRecentLoan ? (
                    <Skeleton
                      width={150}
                      height={28}
                      baseColor="#ffffff20"
                      highlightColor="#ffffff40"
                    />
                  ) : (
                    `Hello, ${user?.first_name}! 👋`
                  )}
                </h1>
                <p className="text-white/80 text-sm sm:text-base font-medium">
                  {loadingRecentLoan ? (
                    <Skeleton
                      width={120}
                      baseColor="#ffffff20"
                      highlightColor="#ffffff40"
                    />
                  ) : (
                    "Ready to manage your finances?"
                  )}
                </p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => navigate("/notifications")}
                className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20 hover:bg-white/20 transition-all duration-200 active:scale-95"
              >
                <IoMdNotifications className="text-2xl text-white" />
              </button>

              {notifications.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 shadow-lg animate-pulse">
                  {
                    notifications.filter(
                      (notification) => !notification.is_read
                    ).length
                  }
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/20 rounded-xl p-2">
                  <GiReceiveMoney className="text-secondary text-xl" />
                </div>
                <div>
                  <p className="text-white/70 text-xs font-medium">
                    Total Loans
                  </p>
                  <p className="text-white font-bold text-lg">
                    {loadingRecentLoan ? (
                      <Skeleton
                        width={40}
                        baseColor="#ffffff20"
                        highlightColor="#ffffff40"
                      />
                    ) : (
                      activeLoansCount
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="bg-light/20 rounded-xl p-2">
                  <FaMoneyCheckAlt className="text-light text-xl" />
                </div>
                <div>
                  <p className="text-white/70 text-xs font-medium">
                    Active Status
                  </p>
                  <p className="text-white font-bold text-sm">
                    {loadingRecentLoan ? (
                      <Skeleton
                        width={60}
                        baseColor="#ffffff20"
                        highlightColor="#ffffff40"
                      />
                    ) : activeLoansCount > 0 ? (
                      "Active"
                    ) : (
                      "No Loans"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 -mt-4 relative z-10 space-y-6">
          {/* Loan Overview Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-dark flex items-center space-x-2">
                  {loadingRecentLoan ? (
                    <Skeleton width={200} height={32} />
                  ) : (
                    <>
                      <span>💰</span>
                      <span>Active Loans</span>
                    </>
                  )}
                </h2>
                {!loadingRecentLoan && activeLoansCount > 0 && (
                  <span className="text-sm text-dark/60 font-medium">
                    {activeLoansCount} {activeLoansCount === 1 ? "Loan" : "Loans"}
                  </span>
                )}
              </div>
            </div>

            {/* Horizontal Scrolling Loan Cards */}
            {loadingRecentLoan ? (
              <div className="p-6">
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex-shrink-0 w-[320px]">
                      <Skeleton height={280} borderRadius={16} />
                    </div>
                  ))}
                </div>
              </div>
            ) : activeLoansCount > 0 ? (
              <div className="p-6">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {loans.map((loan) => (
                    <div
                      key={loan.id}
                      className="flex-shrink-0 w-[320px] bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-200 cursor-pointer"
                      onClick={() => navigate(`/loan-details/${loan.id}`)}
                    >
                      {/* Loan Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="bg-primary/10 rounded-lg p-2">
                              <GiReceiveMoney className="text-primary text-lg" />
                            </div>
                            <div>
                              <p className="text-xs text-dark/60 font-medium">Loan Number</p>
                              <p className="text-sm font-bold text-dark">{loan.loan_number}</p>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-dark mb-1">
                            {loan.loan_type_name}
                          </h3>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            {loan.loan_status}
                          </span>
                        </div>
                      </div>

                      {/* Progress Circle */}
                      <div className="flex justify-center my-6">
                        <div className="relative">
                          <CircularProgressBar
                            labelSize="32px"
                            completed={loan.percentage_complete || 0}
                            height="140px"
                            isLabelVisible
                          />
                        </div>
                      </div>

                      {/* Loan Statistics */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl">
                          <div>
                            <p className="text-xs text-dark/60 font-medium">Outstanding</p>
                            <p className="text-sm font-bold text-primary">
                              {formatCurrency(Number(loan.outstanding_amount))}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-dark/60 font-medium">Amount Paid</p>
                            <p className="text-sm font-bold text-dark">
                              {formatCurrency(Number(loan.amount_paid))}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-dark/60">Total Loan Amount</p>
                            <p className="text-sm font-bold text-dark">
                              {formatCurrency(Number(loan.loan_amount))}
                            </p>
                          </div>
                          <p className="text-xs text-dark/60 mt-1">
                            Applied: {new Date(loan.applied_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/loan-details/${loan.id}`);
                        }}
                        className="w-full mt-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2"
                      >
                        <span>View Details</span>
                        <HiArrowNarrowRight className="text-lg" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-dark mb-2">No Active Loans</h3>
                <p className="text-dark/60 text-sm mb-6">
                  Start your financial journey with flexible loan options
                </p>
                <UniversalButton
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  title="🚀 Apply For New Loan"
                  handleClick={() => navigate("/apply-loan")}
                  icon={<VscGitStashApply className="text-xl" />}
                />
              </div>
            )}

            {/* Action Buttons */}
            {activeLoansCount > 0 && (
              <div className="p-6 pt-0 space-y-3 border-t border-gray-100">
                <UniversalButton
                  className="w-full bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-dark font-bold py-4 px-6 rounded-2xl shadow-lg shadow-secondary/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  title="🚀 Apply For New Loan"
                  handleClick={() => navigate("/apply-loan")}
                  icon={<VscGitStashApply className="text-xl" />}
                />

                <UniversalButton
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  title="💡 View All Loans"
                  handleClick={() => navigate("/loans")}
                  icon={<HiArrowNarrowRight className="text-xl" />}
                  isCustomIcon={true}
                />
              </div>
            )}
          </div>

          {/* Quick Actions Grid */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">⚡</span>
              <h2 className="text-xl font-bold text-dark">Quick Actions</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Apply for Loan Action */}
              <div
                onClick={() => navigate("/loans")}
                className="group bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 rounded-2xl p-5 border border-primary/10 cursor-pointer transform hover:scale-[1.02] transition-all duration-200 active:scale-95"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 group-hover:bg-primary/20 rounded-2xl p-3 transition-colors">
                    <GiReceiveMoney className="text-2xl text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-dark group-hover:text-primary transition-colors">
                      Apply for a Loan
                    </h3>
                    <p className="text-dark/60 text-sm">
                      Quick approval in minutes
                    </p>
                  </div>
                  <HiArrowNarrowRight className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Make Payment Action */}
              <div
                onClick={() => navigate("/payments")}
                className="group bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-150 rounded-2xl p-5 border border-green-200 cursor-pointer transform hover:scale-[1.02] transition-all duration-200 active:scale-95"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 group-hover:bg-green-200 rounded-2xl p-3 transition-colors">
                    <FaCreditCard className="text-2xl text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-dark group-hover:text-green-700 transition-colors">
                      My Payment
                    </h3>
                    <p className="text-dark/60 text-sm">
                      Pay your loan installment
                    </p>
                  </div>
                  <HiArrowNarrowRight className="text-green-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* View Transactions Action */}
              <div
                onClick={() => navigate("/payments")}
                className="group bg-gradient-to-br from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/15 rounded-2xl p-5 border border-secondary/10 cursor-pointer transform hover:scale-[1.02] transition-all duration-200 active:scale-95"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-secondary/10 group-hover:bg-secondary/20 rounded-2xl p-3 transition-colors">
                    <FaMoneyCheckAlt className="text-2xl text-dark" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-dark group-hover:text-dark/80 transition-colors">
                      View Transactions
                    </h3>
                    <p className="text-dark/60 text-sm">
                      Track all your payments
                    </p>
                  </div>
                  <HiArrowNarrowRight className="text-dark group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Additional Actions */}
              <div
                onClick={() => navigate("/grants")}
                className="group bg-gradient-to-br from-light/30 to-light/50 hover:from-light/40 hover:to-light/60 rounded-2xl p-5 border border-light/30 cursor-pointer transform hover:scale-[1.02] transition-all duration-200 active:scale-95"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white/50 group-hover:bg-white/70 rounded-2xl p-3 transition-colors">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-dark group-hover:text-primary transition-colors">
                      Explore Grants
                    </h3>
                    <p className="text-dark/60 text-sm">
                      Discover funding opportunities
                    </p>
                  </div>
                  <HiArrowNarrowRight className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Profile Action */}
              <div
                onClick={() => navigate("/profile")}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 rounded-2xl p-5 border border-gray-200 cursor-pointer transform hover:scale-[1.02] transition-all duration-200 active:scale-95"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white group-hover:bg-primary/5 rounded-2xl p-3 transition-colors">
                    <FaCircleUser className="text-2xl text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-dark group-hover:text-primary transition-colors">
                      Manage Profile
                    </h3>
                    <p className="text-dark/60 text-sm">
                      Update your information
                    </p>
                  </div>
                  <HiArrowNarrowRight className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-gradient-to-r from-primary/5 via-white to-secondary/5 rounded-3xl border border-gray-100 p-6 text-center">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="font-bold text-dark text-lg mb-2">Need Help?</h3>
            <p className="text-dark/70 text-sm mb-4">
              Our support team is here to assist you with any questions about
              loans, grants, or your account.
            </p>
            <button
              onClick={toggleSupportDrawer}
              className="bg-white hover:bg-gray-50 text-primary font-semibold py-2 px-6 rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-200"
            >
              Contact Support
            </button>
          </div>
        </div>
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

      {/* Support Contact Drawer */}
      <SupportContactDrawer
        isOpen={showSupportDrawer}
        onClose={toggleSupportDrawer}
      />
    </>
  );
};

export default HomeComponent;
