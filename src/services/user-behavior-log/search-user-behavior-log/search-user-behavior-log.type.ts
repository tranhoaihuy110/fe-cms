import { IUserBehaviorLogGetApi } from "../../../models";

export interface ISearchUserBehaviorLogResponse {
  data: IUserBehaviorLogGetApi[];
}

export interface ISearchUserBehaviorLogError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchUserBehaviorLogParams {
  size?: number;
  id?: string;
  user_name?: string;
  action?: string;
  from?: string;
  to?: string;
}
