import { ICampaignEmailTemplateGetApi } from "../../../../models";

export interface IDeleteCampaignEmailTemplateConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReset:()=>void;
  config: ICampaignEmailTemplateGetApi | null;
}