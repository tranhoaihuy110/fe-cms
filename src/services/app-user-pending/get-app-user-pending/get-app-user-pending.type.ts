import { IAppUserPendingGetApi } from "../../../models";

export interface IGetAppUserPendingResponse {
  data: IAppUserPendingGetApi[];
}

export interface IGetAppUserPendingError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetAppUserPendingParams {
  page: number;
  size: number;
  user_id?: string;
}
