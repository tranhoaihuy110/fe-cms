import { IMetaDataApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchMetaDataParams } from "./index";

export const searchMetaDataApi = (params: ISearchMetaDataParams) => {
  return new Promise<{ data: IMetaDataApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IMetaDataApi[] }>(
      "/api/v1/common_metadata_partner/get-list",
      {
        params: {
          id: params.id,
          name: params.name,
          category_name: params.category_name,
          category_id: params.category_id,
          service_name: params.service_name,
          create_at_from: params.from,
          create_at_to: params.to,
          size: params.size,
          data_type: params.data_type,
        },
      }
    )
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
