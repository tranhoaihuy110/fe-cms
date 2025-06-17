export interface IPropertyRoomGetApi {
  id?: string;
  property_id: string | null;
  floor_id:string;
  room_type: string;
  room_name: string;
  created_at: string;
  status: string;
}
export interface IPropertyRoomResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IPropertyRoomPatchApi {
  id?: string;
  property_id: string | null;
  floor_id:string;
  room_type: string;
  room_name: string;
  status: string;
}

export interface IPropertyRoomPostApi {
  property_id: string | null;
  floor_id:string;
  room_type: string;
  room_name: string;
  status: string;
}
