export interface IAgentsGetApi {
  id: string;
  name_log: string;
  input: string | null;
  output: string;
  create_date: string;
}

export interface IAgentsResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}
