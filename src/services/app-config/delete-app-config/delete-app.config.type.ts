import { IAppConfigResponseApi } from "../../../models";

export interface IDeleteAppConfigResponse {
  data: IAppConfigResponseApi[];
}

export interface IDeleteAppConfigError {
  message: string;
  statusCode: number;
  error: string;
}
