export interface IPropertyFloorsGetApi {
  id?: string;
  property_id: string | null;
  floor_type: string;
  floor_name: string;
  created_at: string;
  status: string;
}
export interface IPropertyFloorsResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IPropertyFloorsPatchApi {
  id?:string
  property_id: string | null;
  floor_type: string;
  floor_name: string;
  status: string;
}

export interface IPropertyFloorsPostApi {
  property_id: string | null;
  floor_type: string;
  floor_name: string;
  status: string;
}
