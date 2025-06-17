import { ICampaignMasterParticipantBlacklistGetApi } from "../../../../models";

export interface ICampaignMasterParticipantBlacklistFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
  onSubmit: (config: ICampaignMasterParticipantBlacklistGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ICampaignMasterParticipantBlacklistGetApi | null;
  children?: React.ReactNode;
}
