import { IAppConfigResponseApi } from "../../../models";

export interface IPostAppConfigResponse {
  data: IAppConfigResponseApi[];
}

export interface IPostAppConfigError {
  message: string;
  statusCode: number;
  error: string;
}
