import { ICommonFaqGetApi } from "../../../models";

export interface IGetCommonFaqResponse {
  data: ICommonFaqGetApi[];
}

export interface IGetCommonFaqError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetCommonFaqParams {
  page: number; 
  size: number; 
  id?: string; 
}