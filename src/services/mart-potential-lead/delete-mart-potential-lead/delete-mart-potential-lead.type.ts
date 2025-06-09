import { IMartPotentialLeadResponseApi } from "../../../models";

export interface IDeleteMartPotentialLeadResponse {
  data: IMartPotentialLeadResponseApi[];
}

export interface IDeleteMartPotentialLeadError {
  message: string;
  statusCode: number;
  error: string;
}
