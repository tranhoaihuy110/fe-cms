import { ICommonMetadataGetApi } from "../../../models";

export interface IGetCommonMetadataResponse {
  data: ICommonMetadataGetApi[];
}

export interface IGetCommonMetadataError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetCommonMetadataParams {
  page: number; 
  size: number; 
  id?: string;
  meta_key?:string 
}