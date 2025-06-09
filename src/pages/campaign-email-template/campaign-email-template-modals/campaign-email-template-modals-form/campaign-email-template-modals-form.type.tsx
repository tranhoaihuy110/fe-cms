import { ICampaignEmailTemplateGetApi } from "../../../../models";

export interface ICampaignEmailTemplateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
  onSubmit: (config: ICampaignEmailTemplateGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ICampaignEmailTemplateGetApi | null;
  children?: React.ReactNode;
}
