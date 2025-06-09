import { ILeadsPropertyPatchApi } from "../../../models";

export interface IPatchLeadsPropertyResponse {
  data: ILeadsPropertyPatchApi[];
}

export interface IPatchLeadsPropertyError {
  message: string;
  statusCode: number;
  error: string;
}
