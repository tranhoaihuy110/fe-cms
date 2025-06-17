import { ICampaignMasterParticipantBlacklistGetApi } from "../../../../models";

export interface IDeleteCampaignMasterParticipantBlacklistConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReset:()=>void;
  config: ICampaignMasterParticipantBlacklistGetApi | null;
}