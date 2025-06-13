/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICampaignMasterParticipantBlacklistGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getCampaignMasterParticipantBlacklistApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ICampaignMasterParticipantBlacklistGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ICampaignMasterParticipantBlacklistGetApi[] }>("/api/v1/campaign-master-participant-blacklist/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
