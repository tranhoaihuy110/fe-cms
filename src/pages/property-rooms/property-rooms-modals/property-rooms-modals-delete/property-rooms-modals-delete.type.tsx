import { IPropertyRoomGetApi } from "../../../../models";

export interface IDeletePropertyRoomConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
  onConfirm: () => void;
  config: IPropertyRoomGetApi | null;
}