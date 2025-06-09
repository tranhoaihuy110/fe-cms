import { ICampaignMasterGetApi } from "../../../../models";

export interface IDeleteCampaignMasterConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReset:()=>void;
  config: ICampaignMasterGetApi | null;
}