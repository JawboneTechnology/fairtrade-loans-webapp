import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoanGrantSelectionScreen = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("loans"); // Default to loans

  return (
    <div className="h-full bg-gray-50 p-6 pb-[100px]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Funding Options</h1>
          <p className="text-gray-600 mt-2">Choose what you'd like to view</p>
        </header>

        {/* Selection Cards */}
        <div className="space-y-4 mb-8">
          {/* Loans Card */}
          <div
            className={`p-6 rounded-xl shadow-md transition-all duration-200 ${
              selectedOption === "loans"
                ? "bg-primary text-white"
                : "bg-white text-gray-800"
            }`}
            onClick={() => setSelectedOption("loans")}
          >
            <div className="flex items-center">
              <div
                className={`mr-4 p-3 rounded-lg ${
                  selectedOption === "loans" ? "bg-blue-700" : "bg-blue-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-lg">Loans</h2>
                <p
                  className={`text-sm mt-1 ${
                    selectedOption === "loans"
                      ? "text-blue-100"
                      : "text-gray-600"
                  }`}
                >
                  Borrow money with flexible repayment options
                </p>
              </div>
            </div>
          </div>

          {/* Grants Card */}
          <div
            className={`p-6 rounded-xl shadow-md transition-all duration-200 ${
              selectedOption === "grants"
                ? "bg-secondary text-dark"
                : "bg-white text-gray-800"
            }`}
            onClick={() => setSelectedOption("grants")}
          >
            <div className="flex items-center">
              <div
                className={`mr-4 p-3 rounded-lg ${
                  selectedOption === "grants" ? "bg-white" : "bg-green-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-lg">Grants</h2>
                <p
                  className={`text-sm mt-1 ${
                    selectedOption === "grants"
                      ? "text-dark"
                      : "text-gray-600"
                  }`}
                >
                  Funding you don't need to repay
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          className={`w-full py-3 px-4 rounded-lg font-medium shadow-md ${selectedOption === "loans"
              ? "bg-primary hover:bg-blue-700 text-white"
              : "bg-secondary hover:bg-secondary/80 text-dark"
            } transition-colors`}
          onClick={() => navigate(`/${selectedOption}`)}
        >
          View {selectedOption === "loans" ? "Loans" : "Grants"}
        </button>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">
            Need help deciding?
          </h3>
          <p className="text-sm text-gray-600">
            {selectedOption === "loans"
              ? "Loans need to be repaid with interest but often have higher amounts available."
              : "Grants are free money but typically have more eligibility requirements."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanGrantSelectionScreen;
