import { toast } from "sonner";
import { useState, useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import useDependentQueries from "@/hooks/useDependentQueries";
import { useDependents, Dependent } from "@/context/DependentContext";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { BsExclamationCircle, BsFillQuestionCircleFill } from "react-icons/bs";
import {
  Modal,
  Spinner,
  UniversalButton,
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
      <div className="fixed top-5 sm:top-10 w-full max-w-[90%] sm:max-w-[80%] mx-auto z-20 ml-3 sm:ml-20">
        <button
          className="flex items-center text-primary hover:text-gray-700 bg-secondary hover:bg-light-hover px-6 py-2 rounded-full"
          onClick={() => window.history.back()}
        >
          <HiArrowNarrowLeft className="mr-2 text-2xl" />
          Back
        </button>
      </div>

      <div className="min-h-screen md:p-6">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <DependentLoadingSkeleton />
          ) : dependents.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 m-4 mb-20 mt-20">
              <div className="p-8 text-center">
                <BsExclamationCircle className="h-12 w-12 mx-auto text-primary" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No dependents added
                </h3>
                <p className="mt-1 text-gray-500">
                  You haven't added any dependents yet.
                </p>
                <div className="mt-6">
                  <Link
                    to="/create-dependant"
                    className="justify-center inline-flex items-center px-4 py-2 bg-primary w-full text-white font-medium rounded-lg transition-colors shadow-sm"
                  >
                    <FaPlus className="mr-2" />
                    Add Your First Dependent
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 mt-16">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500">Total Dependents</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {dependents.length}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500">Children</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {
                      dependents.filter((d) => d.relationship === "child")
                        .length
                    }
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500">Spouses</p>
                  <p className="text-2xl font-bold text-secondary-600">
                    {
                      dependents.filter((d) => d.relationship === "spouse")
                        .length
                    }
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500">Others</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {
                      dependents.filter(
                        (d) => !["child", "spouse"].includes(d.relationship)
                      ).length
                    }
                  </p>
                </div>
              </div>

              {/* Dependents List */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 m-4 mb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between sticky top-0 bg-white p-4 shadow-sm sm:rounded-t-md z-10">
                  <div>
                    <h1 className="text-xl font-bold text-gray-800">
                      My Dependents
                    </h1>
                    <p className="text-gray-600 text-sm">
                      Manage your family members and dependents
                    </p>
                  </div>
                </div>

                <ul className="divide-y divide-gray-200">
                  {dependents.map((dependent) => (
                    <li key={dependent.id} className="p-4 hover:bg-gray-50">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <FaCircleUser className="h-10 w-10 text-primary" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-800">
                                  {dependent.first_name} {dependent.last_name}
                                </h3>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                  {dependent.relationship}
                                </span>
                              </div>
                              <div className="mt-1 grid grid-cols-2 gap-2 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">Age:</span>{" "}
                                  {calculateAge(dependent.date_of_birth)}
                                </div>
                                <div>
                                  <span className="font-medium">Gender:</span>{" "}
                                  {dependent.gender}
                                </div>
                                <div className="col-span-2">
                                  <span className="font-medium">Email:</span>{" "}
                                  {dependent.email}
                                </div>
                                <div className="col-span-2">
                                  <span className="font-medium">Phone:</span>{" "}
                                  {dependent.phone}
                                </div>
                                <div className="col-span-2">
                                  <span className="font-medium">Added:</span>{" "}
                                  {formatDate(dependent.created_at || "")}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-2">
                          <button
                            onClick={() => handleEdit(dependent || {})}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary-700"
                          >
                            <FaEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(dependent.id || "")}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-300 hover:bg-red-700"
                          >
                            <FaTrash className="mr-1" /> Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <Modal
              closable={false}
              onClose={toggleShowDeleteModal}
              className="w-full sm:w-[50%]"
            >
              <div className="p-5 py-10 w-[95%] mx-auto bg-white rounded-xl">
                <div className="flex items-center justify-center mb-5">
                  <BsFillQuestionCircleFill className="text-[100px] text-primary" />
                </div>

                <h3 className="text-2xl font-semibold text-center text-primary">
                  Are you sure?
                </h3>
                <p className="mt-2 text-gray-600 text-center">
                  You are about to delete this dependent? This action cannot be
                  undone.
                </p>

                <p className="mt-2 text-gray-600 text-center border bg-light border-primary/50 p-3 rounded-lg italic">
                  <span className="text-primary font-semibold">Note:</span>{" "}
                  Deleting a dependent will remove all their information from
                  your account.
                </p>

                <div className="mt-5">
                  {/* Apply Button */}
                  <UniversalButton
                    className="bg-primary hover:bg-primary-dark w-full text-white rounded-full py-2 text-lg"
                    title={!loadingDeletion && "Continue with deletion"}
                    handleClick={confirmDelete}
                    icon={
                      loadingDeletion ? (
                        <Spinner size="sm" color="text-white" />
                      ) : (
                        <HiArrowNarrowRight className="text-xl" />
                      )
                    }
                    isCustomIcon={true}
                  />

                  {/* Cancel Button */}
                  <UniversalButton
                    className="bg-light hover:bg-primary/50 w-full text-primary rounded-full py-2 text-lg mt-3"
                    title="Cancel"
                    handleClick={toggleShowDeleteModal}
                  />
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
              <div className="h-full text-left p-5 pt-10 w-[95%] mx-auto bg-white rounded-xl">
                <div className="absolute right-6 top-5 bg-white">
                  <AiOutlineCloseCircle
                    className="text-2xl text-primary cursor-pointer"
                    onClick={toggleShowEditModal}
                  />
                </div>

                <div className="border-b border-gray-200">
                  <h3 className="text-2xl font-semibold text-center text-primary">
                    Edit {editDependentData?.first_name}{" "}
                    {editDependentData?.last_name}'s Details.
                  </h3>
                  <p className="mt-2 text-gray-500 text-center pb-6">
                    Update the information below to keep your records up to
                    date.
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

          {dependents.length === 0 ? null : (
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-3 flex justify-center border-t border-gray-200">
              <UniversalButton
                className="bg-primary hover:bg-primary-dark w-full sm:max-w-[80%] text-white rounded-md py-2"
                title={"Create New Dependents"}
                handleClick={handleCreateNewDependent}
                icon={<FaPlus className="mr-2" />}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DependentComponents;
