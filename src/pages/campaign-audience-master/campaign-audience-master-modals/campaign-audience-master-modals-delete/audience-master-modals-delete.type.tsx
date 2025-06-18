import { ICampaignAudienceMasterGetApi } from "../../../../models";

export interface IDeleteCampaignAudienceMasterConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReset:()=>void;
  config: ICampaignAudienceMasterGetApi | null;
}