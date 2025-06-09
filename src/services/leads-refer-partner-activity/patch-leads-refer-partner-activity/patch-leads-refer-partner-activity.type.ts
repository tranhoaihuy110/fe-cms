import { ILeadsReferPartnerActivityPatchApi } from "../../../models";

export interface IPatchLeadsReferPartnerActivityResponse {
  data: ILeadsReferPartnerActivityPatchApi[];
}

export interface IPatchLeadsReferPartnerActivityError {
  message: string;
  statusCode: number;
  error: string;
}
