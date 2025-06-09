import { ICommonFaqPatchApi } from "../../../models";

export interface IPatchCommonFaqResponse {
  data: ICommonFaqPatchApi[];
}

export interface IPatchCommonFaqError {
  message: string;
  statusCode: number;
  error: string;
}
