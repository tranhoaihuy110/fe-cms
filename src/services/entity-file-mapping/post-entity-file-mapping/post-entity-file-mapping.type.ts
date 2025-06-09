import { IEntityFileMappingPostApi } from "../../../models";

export interface IPostEntityFileMappingResponse {
  data: IEntityFileMappingPostApi[];
}

export interface IPostEntityFileMappingError {
  message: string;
  statusCode: number;
  error: string;
}
