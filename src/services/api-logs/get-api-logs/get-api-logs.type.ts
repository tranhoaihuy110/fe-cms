import { IApiLogsGetApi } from "../../../models";

export interface IGetApiLogsResponse {
  data: IApiLogsGetApi[];
}

export interface IGetApiLogsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetApiLogsParams {
  page: number; 
  size: number; 
  id: string; 
}