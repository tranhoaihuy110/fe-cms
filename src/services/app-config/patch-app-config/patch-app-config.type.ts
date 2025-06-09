import { IAppConfigPatchApi } from "../../../models";

export interface IPatchAppConfigResponse {
  data: IAppConfigPatchApi[];
}

export interface IPatchAppConfigError {
  message: string;
  statusCode: number;
  error: string;
}
