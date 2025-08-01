import { IEntityFileMappingGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchEntityFileMappingParams } from "./index";

export const searchEntityFileMappingApi = (params: ISearchEntityFileMappingParams) => {
  return new Promise<{ data: IEntityFileMappingGetApi[]} >((resolve, reject) => {
    MS_API.get<{ data: IEntityFileMappingGetApi[] }>("/api/v1/entity-file-mapping/list", {  
      params: {
        id: params.id,
        entity_type: params.entity_type,
        created_at_from: params.from,
        created_at_to: params.to,      
        size: params.size
      },
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};