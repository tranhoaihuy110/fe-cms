import { ICommonBranchPostcodePatchApi } from "../../../models";

export interface IPatchCommonBranchPostcodeResponse {
  data: ICommonBranchPostcodePatchApi[];
}

export interface IPatchCommonBranchPostcodeError {
  message: string;
  statusCode: number;
  error: string;
}
