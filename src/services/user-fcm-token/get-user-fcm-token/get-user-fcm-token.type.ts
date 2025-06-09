import { IUserFcmTokenGetApi } from "../../../models";

export interface IGetUserFcmTokenResponse {
  data: IUserFcmTokenGetApi[];
}

export interface IGetUserFcmTokenError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetUserFcmTokenParams {
  page: number;
  size: number;
  id?: string;
}
