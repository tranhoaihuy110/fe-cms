import { IPropertyRoomGetApi } from "../../../../models";

export interface IPropertyRoomFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: IPropertyRoomGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IPropertyRoomGetApi | null;
  children?: React.ReactNode;
}