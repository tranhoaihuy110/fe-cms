import { ILeadsGetApi } from "../../../models";

export interface IGetLeadsResponse {
  data: ILeadsGetApi[];
}

export interface IGetLeadsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetLeadsParams {
  page: number; 
  size: number; 
  lead_id?: string;
  email?: string;
  phone_number?:string 
}