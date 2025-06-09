import { IAppUserPatchApi } from "../../../models";

export interface IPatchAppUserResponse {
  data: IAppUserPatchApi[];
}

export interface IPatchAppUserError {
  message: string;
  statusCode: number;
  error: string;
}
