import { IPotentialLeadActionResponseApi } from "../../../models";

export interface IDeletePotentialLeadActionResponse {
  data: IPotentialLeadActionResponseApi[];
}

export interface IDeletePotentialLeadActionError {
  message: string;
  statusCode: number;
  error: string;
}
