import { IPropertyOwnerShipGetApi } from "../../../models";

export interface ISearchPropertyOwnerShipResponse {
  data: IPropertyOwnerShipGetApi[];
}

export interface ISearchPropertyOwnerShipError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchPropertyOwnerShipParams {

  size?: number;
  ownership_id?: string;
  property_id?: string;
  owner_id?: string;
  from?: string;
  to?: string;
}
