export interface IUserBehaviorLogGetApi {
  id?: string;
  user_name: string;
  created_by: string;
  json_data: Record<string, any> | null;
  created_at: string;
  action: string;
  description: string;
}

export interface IUserBehaviorLogResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IUserBehaviorLogPatchApi {
  user_name: string;
  created_by: string;
  json_data: Record<string, any> | null;
  action: string;
  description: string;
}

export interface IUserBehaviorLogPostApi {
  user_name: string;
  created_by: string;
  json_data: Record<string, any> | null;
  action: string;
  description: string;
}
