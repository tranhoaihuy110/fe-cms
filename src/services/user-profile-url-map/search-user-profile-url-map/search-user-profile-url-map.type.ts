import { IUserProfileUrlMapGetApi } from "../../../models";

export interface ISearchUserProfileUrlMapResponse {
  data: IUserProfileUrlMapGetApi[];
}

export interface ISearchUserProfileUrlMapError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchUserProfileUrlMapParams {

  size?: number;
  id?: string;
  email?: string;
}
