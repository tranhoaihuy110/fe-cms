import { IApiLogsGetApi } from "../../../models";

export interface ISortApiLogsResponse {
  data: IApiLogsGetApi[];
}

export interface ISortApiLogsError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISortApiLogsParams {
  option: string;
  ascDesc: string; 
  page?: number; 
  size?: number; 
}