import { IUserFcmTokenResponseApi } from "../../../models";

export interface IDeleteUserFcmTokenResponse {
  data: IUserFcmTokenResponseApi[];
}

export interface IDeleteUserFcmTokenError {
  message: string;
  statusCode: number;
  error: string;
}
