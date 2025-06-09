import { IPotentialLeadActionGetApi } from "../../../models";

export interface IGetPotentialLeadActionResponse {
  data: IPotentialLeadActionGetApi[];
}

export interface IGetPotentialLeadActionError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetPotentialLeadActionParams {
  page: number;
  size: number;
  id?: string
}