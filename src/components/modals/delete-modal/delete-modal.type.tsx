import React from "react";
export interface IConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title?: string;
  message?: string | React.JSX.Element;
  confirmButtonText?: string;
  cancelButtonText?: string;
  entityId?: string;
  entityName?: string;
  isLoading?:boolean
}