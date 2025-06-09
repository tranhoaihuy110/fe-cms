/* eslint-disable no-empty */
import React, { useState } from "react";
import { ConfirmationModal } from "../../../../components"; 
import { IDeleteLeadPropertyConfirmationModalProps } from "./index";


export const DeleteLeadPropertyConfirmationModal: React.FC<
  IDeleteLeadPropertyConfirmationModalProps
> = ({ isOpen, onClose, onConfirm, config }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !config) return null;

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Delete Lead Property"
      message={
        <>
          Are you sure you want to delete the Lead Property with ID{" "}
          <span className="font-medium">{config.lead_property_id}</span>? This
          action cannot be undone.
        </>
      }
      confirmButtonText="Delete"
      cancelButtonText="Cancel"
      entityId={config.lead_property_id}
      entityName="Lead Property"
    />
  );
};