import { IMartPotentialLeadGetApi } from "../../../models";

export interface IGetMartPotentialLeadResponse {
  data: IMartPotentialLeadGetApi[];
}

export interface IGetMartPotentialLeadError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetMartPotentialLeadParams {
  page: number;
  size: number;
  potential_lead_id?: string
}