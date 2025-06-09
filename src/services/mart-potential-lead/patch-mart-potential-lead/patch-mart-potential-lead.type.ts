import { IMartPotentialLeadPatchApi } from "../../../models";

export interface IPatchMartPotentialLeadResponse {
  data: IMartPotentialLeadPatchApi[];
}

export interface IPatchMartPotentialLeadError {
  message: string;
  statusCode: number;
  error: string;
}
