import { IPotentialLeadActionGetApi } from "../../../models";

export interface ISortPotentialLeadActionResponse {
  data: IPotentialLeadActionGetApi[];
}

export interface ISortPotentialLeadActionError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortPotentialLeadActionParams {
  option: string;
  ascDesc: string;
  page?: number;
  size?: number;
}
