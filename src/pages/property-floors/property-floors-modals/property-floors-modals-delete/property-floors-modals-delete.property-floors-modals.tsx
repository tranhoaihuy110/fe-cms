/* eslint-disable no-empty */
import React, { useState } from "react";
import { ConfirmationModal } from "../../../../components";
import { IDeletePropertyFloorsConfirmationModalProps } from "./index";

export const DeletePropertyFloorsConfirmationModal: React.FC<
  IDeletePropertyFloorsConfirmationModalProps
> = ({ isOpen, onClose, onConfirm, config, onReset }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !config) return null;

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      onReset && onReset();
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
      title="Delete Property Floors"
      isLoading={isLoading}
      message={
        <>
          Are you sure you want to delete the Property Floors with ID{" "}
          <span className="font-medium">{config.id}</span>? This action cannot
          be undone.
        </>
      }
      confirmButtonText="Delete"
      cancelButtonText="Cancel"
      entityId={config.id}
      entityName="Property Floors"
    />
  );
};
