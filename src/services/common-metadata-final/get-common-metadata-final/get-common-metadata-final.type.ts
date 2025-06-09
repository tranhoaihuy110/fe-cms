import { ICommonMetadataFinalGetApi } from "../../../models";

export interface IGetCommonMetadataFinalResponse {
  data: ICommonMetadataFinalGetApi[];
}

export interface IGetCommonMetadataFinalError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetCommonMetadataFinalParams {
  page: number; 
  size: number; 
  id?: string; 
}