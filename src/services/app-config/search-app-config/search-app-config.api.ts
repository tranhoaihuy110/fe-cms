
import { IAppConfigGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchAppConfigParams } from "./index";

export const searchAppConfigApi = (params: ISearchAppConfigParams) => {
  return new Promise<{ data: IAppConfigGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IAppConfigGetApi[] }>("/api/v1/app-config/list", {  
      params: {
        key: params.key,
        created_at_from: params.from,
        created_at_to: params.to,
        
        size: params.size
      },
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};  