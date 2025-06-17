import { IPropertyFloorsGetApi } from "../../../../models";

export interface IDeletePropertyFloorsConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
  onConfirm: () => void;
  config: IPropertyFloorsGetApi | null;
}