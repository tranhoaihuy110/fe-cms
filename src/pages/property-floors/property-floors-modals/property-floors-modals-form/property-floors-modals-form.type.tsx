import { IPropertyFloorsGetApi } from "../../../../models";

export interface IPropertyFloorsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: IPropertyFloorsGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IPropertyFloorsGetApi | null;
  children?: React.ReactNode;
}