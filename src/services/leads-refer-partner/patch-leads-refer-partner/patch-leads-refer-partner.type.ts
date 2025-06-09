import { ILeadsReferPartnerPatchApi } from "../../../models";

export interface IPatchLeadsReferPartnerResponse {
  data: ILeadsReferPartnerPatchApi[];
}

export interface IPatchLeadsReferPartnerError {
  message: string;
  statusCode: number;
  error: string;
}
