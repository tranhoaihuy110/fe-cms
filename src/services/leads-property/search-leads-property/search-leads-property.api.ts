import { ILeadsPropertyGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchLeadsPropertyParams } from "./index";

export const searchLeadsPropertyApi = (params: ISearchLeadsPropertyParams) => {
  return new Promise<{ data: ILeadsPropertyGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ILeadsPropertyGetApi[] }>("/api/v1/leadsproperty/list", {
      params: {
        created_at_from: params.from,
        created_at_to: params.to,
        email: params.email,    
        size: params.size,
        adresss: params.address,
        lead_property_id: params.lead_property_id,
      },
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
