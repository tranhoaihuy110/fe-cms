import { IAppConfigGetApi } from "../../../models";

export interface IGetAppConfigResponse {
  data: IAppConfigGetApi[];
}

export interface IGetAppConfigError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetAppConfigParams {
  page: number; 
  size: number; 
  key?: string; 
}