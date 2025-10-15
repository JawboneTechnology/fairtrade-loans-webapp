import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoanGrantSelectionScreen = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("loans"); // Default to loans

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10 pb-[100px]">
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <header className="text-center mb-8 pt-8">
          <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            <span className="text-4xl block">💰</span>
          </div>
          <h1 className="text-3xl font-bold text-dark mb-3">
            Choose Your Path
          </h1>
          <p className="text-dark/70 text-lg leading-relaxed">
            Whether you need a loan or qualify for a grant, we're here to
            support your financial goals
          </p>
        </header>

        {/* Selection Cards */}
        <div className="space-y-6 mb-8">
          {/* Loans Card */}
          <div
            className={`group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
              selectedOption === "loans"
                ? "bg-gradient-to-br from-primary to-primary/80 shadow-2xl shadow-primary/25"
                : "bg-white hover:shadow-2xl"
            } rounded-3xl p-8 border-2 ${
              selectedOption === "loans"
                ? "border-primary/20"
                : "border-gray-100 hover:border-primary/30"
            }`}
            onClick={() => setSelectedOption("loans")}
          >
            <div className="flex items-start space-x-6">
              <div
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  selectedOption === "loans"
                    ? "bg-white/20 group-hover:bg-white/30"
                    : "bg-primary/10 group-hover:bg-primary/20"
                }`}
              >
                <span className="text-3xl">🏦</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2
                    className={`font-bold text-2xl ${
                      selectedOption === "loans"
                        ? "text-white"
                        : "text-dark group-hover:text-primary"
                    } transition-colors`}
                  >
                    Personal Loans
                  </h2>
                  {selectedOption === "loans" && (
                    <div className="bg-white/20 rounded-full p-2">
                      <span className="text-white text-lg">✓</span>
                    </div>
                  )}
                </div>
                <p
                  className={`text-base leading-relaxed mb-4 ${
                    selectedOption === "loans"
                      ? "text-white/90"
                      : "text-dark/70"
                  }`}
                >
                  Get the funds you need with competitive rates and flexible
                  repayment terms
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedOption === "loans"
                        ? "bg-white/20 text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    Quick Approval
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedOption === "loans"
                        ? "bg-white/20 text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    Flexible Terms
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedOption === "loans"
                        ? "bg-white/20 text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    Up to $50,000
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grants Card */}
          <div
            className={`group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
              selectedOption === "grants"
                ? "bg-gradient-to-br from-secondary to-secondary/80 shadow-2xl shadow-secondary/25"
                : "bg-white hover:shadow-2xl"
            } rounded-3xl p-8 border-2 ${
              selectedOption === "grants"
                ? "border-secondary/20"
                : "border-gray-100 hover:border-secondary/30"
            }`}
            onClick={() => setSelectedOption("grants")}
          >
            <div className="flex items-start space-x-6">
              <div
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  selectedOption === "grants"
                    ? "bg-dark/10 group-hover:bg-dark/20"
                    : "bg-secondary/10 group-hover:bg-secondary/20"
                }`}
              >
                <span className="text-3xl">🎁</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2
                    className={`font-bold text-2xl ${
                      selectedOption === "grants"
                        ? "text-dark"
                        : "text-dark group-hover:text-dark/80"
                    } transition-colors`}
                  >
                    Financial Grants
                  </h2>
                  {selectedOption === "grants" && (
                    <div className="bg-dark/10 rounded-full p-2">
                      <span className="text-dark text-lg">✓</span>
                    </div>
                  )}
                </div>
                <p
                  className={`text-base leading-relaxed mb-4 ${
                    selectedOption === "grants"
                      ? "text-dark/80"
                      : "text-dark/70"
                  }`}
                >
                  Free funding opportunities that don't require repayment -
                  perfect for qualifying individuals
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedOption === "grants"
                        ? "bg-dark/10 text-dark"
                        : "bg-secondary/10 text-dark"
                    }`}
                  >
                    No Repayment
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedOption === "grants"
                        ? "bg-dark/10 text-dark"
                        : "bg-secondary/10 text-dark"
                    }`}
                  >
                    Eligibility Based
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedOption === "grants"
                        ? "bg-dark/10 text-dark"
                        : "bg-secondary/10 text-dark"
                    }`}
                  >
                    Up to $25,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          className={`w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-2xl transform hover:scale-[1.02] active:scale-95 transition-all duration-200 ${
            selectedOption === "loans"
              ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-white shadow-primary/30"
              : "bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary hover:to-secondary text-dark shadow-secondary/30"
          }`}
          onClick={() => navigate(`/${selectedOption}`)}
        >
          <div className="flex items-center justify-center space-x-3">
            <span>
              {selectedOption === "loans" ? "Explore Loans" : "Browse Grants"}
            </span>
            <span className="text-xl">
              {selectedOption === "loans" ? "🏦" : "🎁"}
            </span>
          </div>
        </button>

        {/* Comparison Info */}
        <div className="mt-8 bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="text-center mb-4">
            <span className="text-2xl">💡</span>
          </div>
          <h3 className="font-bold text-dark text-lg mb-3 text-center">
            {selectedOption === "loans"
              ? "Why Choose Loans?"
              : "Why Choose Grants?"}
          </h3>
          <div className="space-y-3">
            {selectedOption === "loans" ? (
              <>
                <div className="flex items-start space-x-3">
                  <span className="text-primary mt-1">✓</span>
                  <p className="text-dark/80 text-sm">
                    Higher funding amounts available (up to $50,000)
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-primary mt-1">✓</span>
                  <p className="text-dark/80 text-sm">
                    Faster approval process with competitive rates
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-primary mt-1">✓</span>
                  <p className="text-dark/80 text-sm">
                    Build credit history with responsible repayment
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start space-x-3">
                  <span className="text-secondary mt-1">✓</span>
                  <p className="text-dark/80 text-sm">
                    No repayment required - it's free money
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-secondary mt-1">✓</span>
                  <p className="text-dark/80 text-sm">
                    Perfect for specific qualifying circumstances
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-secondary mt-1">✓</span>
                  <p className="text-dark/80 text-sm">
                    Designed to help communities and individuals thrive
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Switch Option */}
        <div className="mt-6 text-center">
          <p className="text-dark/60 text-sm mb-3">
            Not sure which option is right for you?
          </p>
          <button
            onClick={() =>
              setSelectedOption(selectedOption === "loans" ? "grants" : "loans")
            }
            className="text-primary hover:text-primary/80 font-semibold text-sm underline transition-colors"
          >
            Compare {selectedOption === "loans" ? "Grants" : "Loans"} Instead
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanGrantSelectionScreen;
