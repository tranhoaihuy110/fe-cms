import { ICommonMetadataGetApi } from "../../../models";

export interface ISearchCommonMetadataResponse {
  data: ICommonMetadataGetApi[];
}

export interface ISearchCommonMetadataError {
  message: string;
  statusCode: number;
  error: string;
}


export interface ISearchCommonMetadataParams {
 from?: string ,
  to?: string ,

  size?: number ,
  id?: string , 
  meta_key?:string
}