import { ISfMartLeadsGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchSfMartLeadsParams } from "./index";

export const searchSfMartLeadsApi = (params: ISearchSfMartLeadsParams) => {
  return new Promise<{ data: ISfMartLeadsGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ISfMartLeadsGetApi[] }>("/api/v1/sf-mart-leads/list", {
      params: {
        id: params.id,
        created_at_from: params.from,
        created_at_to: params.to,
        username: params.username,
        size: params.size,
      },
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
