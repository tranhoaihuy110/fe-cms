import { ILeadActivityGetApi } from "../../../models";

export interface IGetLeadActivityResponse {
  data: ILeadActivityGetApi[];
}

export interface IGetLeadActivityError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetLeadActivityParams {
  page: number; 
  size: number; 
  activity_id?: string; 
}