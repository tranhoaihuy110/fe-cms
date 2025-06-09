import { IMartPotentialLeadPostApi } from "../../../models";

export interface IPostMartPotentialLeadResponse {
  data: IMartPotentialLeadPostApi[];
}

export interface IPostMartPotentialLeadError {
  message: string;
  statusCode: number;
  error: string;
}
