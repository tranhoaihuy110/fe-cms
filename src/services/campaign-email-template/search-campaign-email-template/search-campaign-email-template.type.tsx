import { ICampaignEmailTemplateGetApi } from "../../../models";

interface IPagination {
  total: number;
  page: number;
  size: number;
}

export interface ICampaignEmailTemplateResponse {
  statusCode: number;
  message: string;
  data: ICampaignEmailTemplateGetApi[];
  pagination?: IPagination;
}

export interface ICampaignEmailTemplateError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ICampaignEmailTemplateParams {
  from?: string;
  to?: string;
  size?: number;
  id?: string;
  template_email_code?: string;
  email_subject?: string;
  email_body?: string;
  email_type?: string;
  template_email_keys?: string;
  created_at?: string;
  updated_at?: string;
  user_create?: string;
}
