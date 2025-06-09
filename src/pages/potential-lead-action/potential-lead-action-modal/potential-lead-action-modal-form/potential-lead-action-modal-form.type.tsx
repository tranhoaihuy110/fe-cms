import { IPotentialLeadActionGetApi } from "../../../../models";
export interface potentialLeadActionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IPotentialLeadActionGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IPotentialLeadActionGetApi;
  children?: React.ReactNode;
}