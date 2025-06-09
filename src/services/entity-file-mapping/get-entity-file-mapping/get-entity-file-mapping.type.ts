import { IEntityFileMappingGetApi } from "../../../models";

export interface IGetEntityFileMappingResponse {
  data: IEntityFileMappingGetApi[];
}

export interface IGetEntityFileMappingError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetEntityFileMappingParams {
  page: number;
  size: number;
  id?: string;
  entity_type?:string;
  mapping_key?:string;
  entity_id?:string;
}
