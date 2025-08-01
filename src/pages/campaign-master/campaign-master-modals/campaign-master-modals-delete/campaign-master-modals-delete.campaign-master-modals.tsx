/* eslint-disable no-empty */
import React, { useState } from "react";
import { ConfirmationModal } from "../../../../components"; 
import { IDeleteCampaignMasterConfirmationModalProps } from "./index";


export const DeleteCampaignMasterConfirmationModal: React.FC<
  IDeleteCampaignMasterConfirmationModalProps
> = ({ isOpen, onClose, onConfirm, config,onReset }) => {
  const [isLoading, setIsLoading] = useState(false);
  

  if (!isOpen || !config) return null;

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      onReset && onReset()
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
      title="Delete Campaign Master"
      isLoading={isLoading}
      message={
        <>
          Are you sure you want to delete the Campaign Master with ID{" "}
          <span className="font-medium">{config.id}</span>? This
          action cannot be undone.
        </>
      }
      confirmButtonText="Delete"
      cancelButtonText="Cancel"
      entityId={config.id}
      entityName="Campaign Master"
    />
  );
};