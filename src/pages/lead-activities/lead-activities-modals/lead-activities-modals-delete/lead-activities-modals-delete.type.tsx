import { ILeadActivityGetApi } from "../../../../models";
export interface DeleteLeadActivityConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  config: ILeadActivityGetApi | null;
}
