import { ICampaignMasterGetApi } from "../../../../models";

export interface ICampaignMasterFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
  onSubmit: (config: ICampaignMasterGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ICampaignMasterGetApi | null;
  children?: React.ReactNode;
}
