import { IPropertyRoomGetApi } from "../../../models";

export interface ISearchPropertyRoomResponse {
  data: IPropertyRoomGetApi[];
}

export interface ISearchPropertyRoomError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchPropertyRoomParams {
  to?: string;
  from?: string;
  size?: number;
  id?: string;
  property_id?: string;
  room_type?: string;
  room_name?: string;
  floor_id?: string;
}
