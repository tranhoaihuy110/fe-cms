import { IPotentialLeadActionPostApi } from "../../../models";

export interface IPostPotentialLeadActionResponse {
  data: IPotentialLeadActionPostApi[];
}

export interface IPostPotentialLeadActionError {
  message: string;
  statusCode: number;
  error: string;
}
