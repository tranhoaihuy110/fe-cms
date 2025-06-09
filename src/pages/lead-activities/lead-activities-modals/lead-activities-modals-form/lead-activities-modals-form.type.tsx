import { ILeadActivityGetApi } from "../../../../models";
export interface ILeadActivityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ILeadActivityGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ILeadActivityGetApi;
  children?: React.ReactNode;
}
