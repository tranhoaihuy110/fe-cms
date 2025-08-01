import { useState } from "react";
import { Modal, Button } from "../../../../components/index";
import { IDeleteCommonFaqConfirmationModalProps } from "./index";
import { toast } from "react-toastify";

export const DeleteCommonFaqConfirmationModal: React.FC<
  IDeleteCommonFaqConfirmationModalProps
> = ({ isOpen, onClose, onConfirm, config }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !config) return null;

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      onClose();
      toast.success(`FAQ "${config.faq_q}" deleted successfully!`);
    } catch (error) {
      const err = error as { message: string; error?: string };
      const errorMessage =
        err.message || err.error || `Failed to delete FAQ "${config.faq_q}".`;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
      <div className="relative w-full max-w-[500px] rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2">
          <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Delete FAQ
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete the FAQ with question{" "}
            <span className="font-medium">
              {config.faq_q.length > 50
                ? `${config.faq_q.substring(0, 50)}...`
                : config.faq_q}
            </span>
            ? This action cannot be undone.
          </p>
        </div>
        <div className="flex items-center gap-3 px-2 lg:justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
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
      </div>
    </Modal>
  );
};