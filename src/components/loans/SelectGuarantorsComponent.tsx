import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import useLoanQueries from "@/hooks/useLoanQueries";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoMdCheckboxOutline } from "react-icons/io";
import { useLoans, Guarantor } from "@/context/LoanContext";
import { useRef, useState, useEffect, useCallback } from "react";

interface SelectGuarantorsProps {
  onClose: () => void;
}

const SelectGuarantorsComponent = ({ onClose }: SelectGuarantorsProps) => {
  const {
    limit,
    setStart,
    guarantors,
    setGuarantors,
    loanApplication,
    setLoanApplication,
    fetchGuarantors: refetchGuarantors,
  } = useLoans();
  const { getGuarantorSearch } = useLoanQueries();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nextStart, setNextStart] = useState<number | null>(0);
  const initialFetchDone = useRef(false);

  // Helper to toggle guarantor id
  const toggleGuarantor = (id: string) => {
    const isSelected = (loanApplication.guarantors || []).includes(id);
    if (isSelected) {
      setLoanApplication({
        ...loanApplication,
        guarantors: (loanApplication.guarantors || []).filter(
          (guarantorId) => guarantorId !== id
        ),
      });
    } else {
      setLoanApplication({
        ...loanApplication,
        guarantors: [...(loanApplication.guarantors || []), id],
      });
    }
  };

  // Throttle function to limit scroll handler calls
  const throttle = (func: Function, delay: number) => {
    let lastCall = 0;
    return (...args: any[]) => {
      const now = Date.now();
      if (now - lastCall < delay) return;
      lastCall = now;
      func(...args);
    };
  };

  const fetchGuarantors = async (pageStart: number) => {
    if (loading) return;

    if (searchQuery === "") {
      setStart(0);
      setGuarantors([]);
      setNextStart(0);
      refetchGuarantors();
      return;
    }

    setLoading(true);

    try {
      const { success, message, data } = await getGuarantorSearch(
        searchQuery,
        pageStart.toString(),
        limit.toString()
      );

      if (!success) {
        console.error(message);
        setLoading(false);
        return;
      }

      // If this is an initial search (pageStart === 0), replace guarantors; otherwise, append.
      if (pageStart === 0) {
        setGuarantors(data);
      } else {
        setGuarantors((prev: Guarantor[]) => [...prev, ...data]);
      }

      // Update pagination values – you can adjust these as needed.
      setStart(pageStart + limit);
      setNextStart(pageStart + limit);
    } catch (error) {
      console.error("Error fetching guarantors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch new results when the search query changes
  useEffect(() => {
    // Reset pagination and guarantor list if search query changes.
    fetchGuarantors(0);
  }, [searchQuery]);

  // Initial fetch on component mount (if not already done)
  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchGuarantors(0);
      initialFetchDone.current = true;
    }
  }, []);

  // Scroll listener to fetch more data (infinite scrolling)
  const handleScroll = useCallback(() => {
    if (loading || nextStart === null) return;
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      fetchGuarantors(nextStart);
    }
  }, [loading, nextStart]);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 500);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="w-full bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800 bg-white p-5 border-b">
          Select Guarantors
        </h2>

        <div className="w-full max-w-[90%] sm:max-w-[80%] mx-auto h-[calc(100vh-60px)] overflow-y-auto pb-20 pt-5 sm:mt-20">
          {/* Search Guarantor Input */}
          <div className="space-y-3 bg-white p-1 rounded-full border border-gray-400">
            <div className="flex items-center gap-2 px-3">
              <FiSearch className="text-gray-400 text-2xl" />
              <input
                type="text"
                placeholder="Search Guarantor"
                className="w-full px-3 py-2 border-gray-300 focus:outline-none focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <AiOutlineCloseCircle
                className="text-gray-400 text-2xl cursor-pointer hover:text-gray-600"
                onClick={() => setSearchQuery("")}
              />
            </div>
          </div>

          <div className="w-full mt-5">
            {guarantors?.length === 0 && !loading && (
              <div className="text-center text-gray-600">
                No guarantors found for search query{" "}
                <span className="text-dark font-medium">"{searchQuery}"</span>
              </div>
            )}
            {guarantors?.map((guarantor: Guarantor) => {
              const isSelected = (loanApplication.guarantors || []).includes(
                guarantor.id
              );
              return (
                <div
                  key={guarantor.id}
                  onClick={() => toggleGuarantor(guarantor.id)}
                  className={`flex items-center rounded-md px-4 py-3 mb-3 cursor-pointer border-b last:border-0 ${
                    isSelected
                      ? "bg-light border-primary"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <IoMdCheckboxOutline
                    className={`text-2xl ${
                      isSelected ? "text-primary" : "text-gray-200"
                    }`}
                  />
                  <label
                    htmlFor={`guarantor-${guarantor.id}`}
                    className={`ml-5 text-base flex items-center gap-2 select-none ${
                      isSelected ? "text-primary" : "text-gray-600"
                    }`}
                  >
                    <FaUserCircle className="inline" />
                    {guarantor.first_name} {guarantor.last_name}
                  </label>
                </div>
              );
            })}
            {loading && (
              <div className="text-center text-gray-600 mt-3">
                Loading more guarantors...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border border-gray-200 w-full sm:max-w-[80%] mx-auto">
        <button
          onClick={onClose}
          className="bg-primary text-white py-3 px-6 rounded-lg w-full"
        >
          Continue with selected ({loanApplication.guarantors?.length || 0})
        </button>
      </div>
    </>
  );
};

export default SelectGuarantorsComponent;
