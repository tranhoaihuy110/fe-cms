import { IMetaDataApi } from "../../../../models";

export interface IPartnerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
  onSubmit: (service: IMetaDataApi) => void;
  mode: "add" | "edit" | "detail";
  partner: IMetaDataApi | null;
  children?: React.ReactNode; 
}
export interface ExtendedMetaDataApi extends IMetaDataApi {
  parent_name: string;
  parent_names: string[];
}
