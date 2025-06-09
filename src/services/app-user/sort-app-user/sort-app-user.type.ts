import { IAppUserGetApi } from "../../../models";

export interface ISortAppUserResponse {
  data: IAppUserGetApi[];
}

export interface ISortAppUserError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortAppUserParams {
  option: string;
  ascDesc: string; 
  page?: number; 
  size?: number; 
}