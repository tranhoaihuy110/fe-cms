export interface ILeadsReferPartnerGetApi {
  refer_partner_id: string;
  lead_id: string;
  email: string;
  created_at: string;
  updated_at: string;
  updated_by: string;
  json_metadata: string;
  refer_partner_status: string;
  trans_value: string;
}

export interface ILeadsReferPartnerResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ILeadsReferPartnerPatchApi {
  refer_partner_id : string;
  lead_id: string;
  json_metadata: string;
  refer_partner_status: string;
  trans_value: string;
}

export interface ILeadsReferPartnerPostApi {
  lead_id: string;
  email: string;
  created_at: string;
  updated_at: string;
}