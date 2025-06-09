import { ICommonMetadataPatchApi } from "../../../models";

export interface IPatchCommonMetadataResponse {
  data: ICommonMetadataPatchApi[];
}

export interface IPatchCommonMetadataError {
  message: string;
  statusCode: number;
  error: string;
}
