import { IEntityFileMappingGetApiResponseApi } from "../../../models";

export interface IDeleteEntityFileMappingResponse {
  data: IEntityFileMappingGetApiResponseApi[];
}

export interface IDeleteEntityFileMappingError {
  message: string;
  statusCode: number;
  error: string;
}
