import { IAppUserGetApi } from "../../../models";

export interface IGetAppUserResponse {
  data: IAppUserGetApi[];
}

export interface IGetAppUserError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetAppUserParams {
  page: number; 
  size: number; 
  user_id?: string;
}