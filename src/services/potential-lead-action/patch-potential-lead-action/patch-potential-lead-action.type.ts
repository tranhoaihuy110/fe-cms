import { IPotentialLeadActionPatchApi } from "../../../models";

export interface IPatchPotentialLeadActionResponse {
  data: IPotentialLeadActionPatchApi[];
}

export interface IPatchPotentialLeadActionError {
  message: string;
  statusCode: number;
  error: string;
}
