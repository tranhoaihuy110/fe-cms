import { IUserBehaviorLogGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchUserBehaviorLogParams } from "./index";

export const searchUserBehaviorLogApi = (
  params: ISearchUserBehaviorLogParams
) => {
  return new Promise<{ data: IUserBehaviorLogGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IUserBehaviorLogGetApi[] }>(
      "/api/v1/user-behavior-log/list",
      {
        params: {
          id: params.id,
          user_name: params.user_name,
          action: params.action,
          created_at_from: params.from,
          created_at_to: params.to,
          size: params.size,
        },
      }
    )
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
