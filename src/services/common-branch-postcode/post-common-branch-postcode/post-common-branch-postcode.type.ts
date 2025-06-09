import { ICommonBranchPostcodeResponseApi } from "../../../models";

export interface IPostCommonBranchPostcodeResponse {
  data: ICommonBranchPostcodeResponseApi[];
}

export interface IPostCommonBranchPostcodeError {
  message: string;
  statusCode: number;
  error: string;
}
