import { IUserBehaviorLogGetApi } from "../../../../models";

export interface IDeleteUserBehaviorLogConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReset:()=>void;
  config: IUserBehaviorLogGetApi | null;
}