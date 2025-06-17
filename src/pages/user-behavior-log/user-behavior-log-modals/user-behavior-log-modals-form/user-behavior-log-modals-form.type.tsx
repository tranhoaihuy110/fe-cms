import { IUserBehaviorLogGetApi } from "../../../../models";

export interface IUserBehaviorLogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
  onSubmit: (config: IUserBehaviorLogGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IUserBehaviorLogGetApi | null;
  children?: React.ReactNode;
}
