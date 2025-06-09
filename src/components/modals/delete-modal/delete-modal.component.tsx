/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Modal, Button } from "../../../components";
import { toast } from "react-toastify";
import {IConfirmationModalProps} from './index'

export const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message,
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
  entityId,
  entityName = "item",
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      onClose();
      toast.success(`${entityName} "${entityId || "selected"}" deleted successfully!`);
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
      <div className="relative w-full max-w-[500px] rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2">
          <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {message || (
              <>
                Are you sure you want to delete the {entityName} with ID{" "}
                <span className="font-medium">{entityId || "selected"}</span>? This
                action cannot be undone.
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3 px-2 lg:justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelButtonText}
          </Button>
          <Button
            size="sm"
            onClick={handleConfirm}
            className="rounded-full bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};