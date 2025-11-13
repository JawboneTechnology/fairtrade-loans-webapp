import { toast } from "sonner";
import { useState, useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import useDependentQueries from "@/hooks/useDependentQueries";
import { useDependents, Dependent } from "@/context/DependentContext";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { BsExclamationCircle, BsFillQuestionCircleFill } from "react-icons/bs";
import {
  Modal,
  Spinner,
  EditDependentComponent,
  DependentLoadingSkeleton,
} from "@/components";

const DependentComponents = () => {
  const navigate = useNavigate();
  const {
    loading,
    fetchUserDependents,
    userDependents: dependents,
    setUserDependents: setDependents,
  } = useDependents();

  const { deleteUserDependent } = useDependentQueries();
  const [editDependentData, setEditDependentData] = useState<Dependent | null>(
    null
  );
  const [loadingDeletion, setLoadingDeletion] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDependent, setSelectedDependent] = useState<string | null>(
    null
  );

  const handleDelete = (dependentId: string): void => {
    setSelectedDependent(dependentId);
    setShowDeleteModal(true);
  };

  const toggleShowDeleteModal = () => setShowDeleteModal((prev) => !prev);
  const toggleShowEditModal = () => setShowEditModal((prev) => !prev);

  const confirmDelete = async () => {
    if (!selectedDependent && loadingDeletion) return;

    setLoadingDeletion(true);

    const response = await deleteUserDependent(selectedDependent as string);

    if (response.success) {
      setLoadingDeletion(false);
      setDependents((prev) =>
        prev.filter((dep) => dep.id !== selectedDependent)
      );
      toast.success("Dependant Deleted!", {
        description: response.message,
        duration: 5000,
      });
    } else {
      setLoadingDeletion(false);
      toast.error("Error deleting dependent", {
        description: response.message,
        duration: 5000,
      });
    }
    setShowDeleteModal(false);
  };

  const calculateAge = (dob: string): number => {
    const birthDate: Date = new Date(dob);
    const today: Date = new Date();
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const monthDiff: number = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString: string): string => {
    const options = {
      year: "numeric" as const,
      month: "short" as const,
      day: "numeric" as const,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCreateNewDependent = () => {
    navigate("/create-dependant");
  };

  const handleEdit = (dependent: Dependent) => {
    setEditDependentData(dependent);
    toggleShowEditModal();
  };

  useEffect(() => {
    fetchUserDependents();
  }, []);

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
                  <HiUsers className="text-3xl text-white" />
                </div>
              </div>
              <h1 className="text-white font-bold text-2xl sm:text-3xl mb-2">
                My Dependents
              </h1>
              <p className="text-white/80 text-sm">
                Manage your family members and dependents
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 -mt-4 relative z-10 pb-32">
          {loading ? (
            <DependentLoadingSkeleton />
          ) : dependents.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <BsExclamationCircle className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">
                No dependents added
              </h3>
              <p className="text-dark/60 mb-6">
                You haven't added any dependents yet.
              </p>
              <Link
                to="/create-dependant"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold rounded-2xl transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02]"
              >
                <FaPlus className="mr-2" />
                Add Your First Dependent
              </Link>
            </div>
          ) : (
            <>
              {/* Stats Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 border border-primary/10">
                  <p className="text-xs text-dark/60 mb-1">Total Dependents</p>
                  <p className="text-2xl font-bold text-primary">
                    {dependents.length}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-4 border border-secondary/10">
                  <p className="text-xs text-dark/60 mb-1">Children</p>
                  <p className="text-2xl font-bold text-dark">
                    {
                      dependents.filter((d) => d.relationship === "child")
                        .length
                    }
                  </p>
                </div>
                <div className="bg-gradient-to-br from-light/30 to-light/50 rounded-2xl p-4 border border-light/30">
                  <p className="text-xs text-dark/60 mb-1">Spouses</p>
                  <p className="text-2xl font-bold text-dark">
                    {
                      dependents.filter((d) => d.relationship === "spouse")
                        .length
                    }
                  </p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                  <p className="text-xs text-dark/60 mb-1">Others</p>
                  <p className="text-2xl font-bold text-dark">
                    {
                      dependents.filter(
                        (d) => !["child", "spouse"].includes(d.relationship)
                      ).length
                    }
                  </p>
                </div>
              </div>

              {/* Dependents List */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-dark">
                    Dependents List
                  </h2>
                </div>

                <div className="divide-y divide-gray-100">
                  {dependents.map((dependent) => (
                    <div key={dependent.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border-2 border-primary/20">
                                <FaCircleUser className="h-8 w-8 text-primary" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-bold text-dark">
                                  {dependent.first_name} {dependent.last_name}
                                </h3>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary capitalize">
                                  {dependent.relationship}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-dark/70">
                                <div>
                                  <span className="font-medium">Age:</span>{" "}
                                  {calculateAge(dependent.date_of_birth)} years
                                </div>
                                <div>
                                  <span className="font-medium">Gender:</span>{" "}
                                  {dependent.gender}
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                  <span className="font-medium">Email:</span>{" "}
                                  {dependent.email}
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                  <span className="font-medium">Phone:</span>{" "}
                                  {dependent.phone}
                                </div>
                                <div className="col-span-1 sm:col-span-2 text-xs text-dark/50">
                                  <span className="font-medium">Added:</span>{" "}
                                  {formatDate(dependent.created_at || "")}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 md:ml-4">
                          <button
                            onClick={() => handleEdit(dependent || {})}
                            className="inline-flex items-center px-4 py-2 border border-primary/20 text-sm font-semibold rounded-2xl text-primary bg-primary/5 hover:bg-primary/10 transition-all duration-200 transform hover:scale-105"
                          >
                            <FaEdit className="mr-2" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(dependent.id || "")}
                            className="inline-flex items-center px-4 py-2 border border-red-200 text-sm font-semibold rounded-2xl text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-200 transform hover:scale-105"
                          >
                            <FaTrash className="mr-2" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          closable={false}
          onClose={toggleShowDeleteModal}
          className="w-full sm:w-[50%]"
        >
          <div className="p-6 py-10 w-[95%] mx-auto bg-white rounded-3xl">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-red-100 rounded-full p-4">
                <BsFillQuestionCircleFill className="text-5xl text-red-600" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center text-dark mb-3">
              Are you sure?
            </h3>
            <p className="text-gray-600 text-center mb-4">
              You are about to delete this dependent. This action cannot be
              undone.
            </p>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4 mb-6">
              <p className="text-sm text-red-700 text-center">
                <span className="font-semibold">⚠️ Note:</span> Deleting a dependent will remove all their information from
                your account permanently.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={confirmDelete}
                disabled={loadingDeletion}
                className={`w-full py-3 px-6 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center space-x-2 ${loadingDeletion
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
                  }`}
              >
                {loadingDeletion ? (
                  <>
                    <Spinner size="sm" color="text-white" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <FaTrash className="text-lg" />
                    <span>Yes, Delete</span>
                  </>
                )}
              </button>

              <button
                onClick={toggleShowDeleteModal}
                disabled={loadingDeletion}
                className="w-full py-3 px-6 rounded-2xl font-semibold bg-gray-100 hover:bg-gray-200 text-dark transition-all duration-200 border border-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Dependent Modal */}
      {showEditModal && (
        <Modal
          closable={false}
          onClose={toggleShowEditModal}
          className="w-full sm:w-[50%]"
        >
          <div className="h-full text-left p-6 pt-10 w-[95%] mx-auto bg-white rounded-3xl relative">
            <button
              onClick={toggleShowEditModal}
              className="absolute right-6 top-6 text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <AiOutlineCloseCircle className="text-2xl" />
            </button>

            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <FaEdit className="text-2xl text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center text-dark">
                Edit {editDependentData?.first_name}{" "}
                {editDependentData?.last_name}'s Details
              </h3>
              <p className="mt-2 text-dark/60 text-center">
                Update the information below to keep your records up to date.
              </p>
            </div>

            {/* Edit Form */}
            <EditDependentComponent
              dependentData={editDependentData as Dependent}
              onClose={toggleShowEditModal}
              onSuccess={() => {
                fetchUserDependents();
                toggleShowEditModal();
              }}
            />
          </div>
        </Modal>
      )}

      {/* Fixed Add Button at Bottom */}
      {dependents.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
          <div className="max-w-[90%] sm:max-w-[80%] mx-auto p-4">
            <button
              onClick={handleCreateNewDependent}
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2 active:scale-95"
            >
              <FaPlus className="text-lg" />
              <span>Create New Dependent</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DependentComponents;
