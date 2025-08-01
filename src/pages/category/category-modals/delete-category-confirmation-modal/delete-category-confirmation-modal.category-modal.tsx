import { IDeleteCategoryConfirmationModalProps } from "./index";
import { Modal, Button } from "../../../../components/index";
import { useState } from "react";
import { toast } from "react-toastify";

export const DeleteCategoryConfirmationModal: React.FC<
  IDeleteCategoryConfirmationModalProps
> = ({ isOpen, onClose, onConfirm, category, children = "" }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !category) return null;

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      onClose();
      toast.success(
        `Category ${category.name}" deleted successfully!`
      )
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
      <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Confirm Delete
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Are you sure you want to delete the category "{category.name}"? This
            action cannot be undone.
          </p>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            className="rounded-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleDelete}
            className="rounded-full bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
        {children}
      </div>
    </Modal>
  );
};
