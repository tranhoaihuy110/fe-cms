import { ICommonBranchPostcodeResponseApi } from "../../../models";

export interface IDeleteCommonBranchPostcodeResponse {
  data: ICommonBranchPostcodeResponseApi[];
}

export interface IDeleteCommonBranchPostcodeError {
  message: string;
  statusCode: number;
  error: string;
}
