import { ICampaignAudienceMasterGetApi } from "../../../../models";

export interface ICampaignAudienceMasterFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
  onSubmit: (config: ICampaignAudienceMasterGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ICampaignAudienceMasterGetApi | null;
  children?: React.ReactNode;
}
