import { ICommonBranchPostcodeGetApi } from "../../../models";

export interface IGetCommonBranchPostcodeResponse {
  data: ICommonBranchPostcodeGetApi[];
}

export interface IGetCommonBranchPostcodeError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetCommonBranchPostcodeParams {
  page: number; 
  size: number; 
  id?: string; 
}