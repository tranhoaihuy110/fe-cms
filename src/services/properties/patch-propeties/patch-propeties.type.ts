import { IPropertiesPatchApi } from "../../../models";

export interface IPatchPropertiesResponse {
  data: IPropertiesPatchApi[];
}

export interface IPatchPropertiesError {
  message: string;
  statusCode: number;
  error: string;
}
