import { ICampaignMasterParticipantBlacklistGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchCampaignMasterParticipantBlacklistParams } from "./index";

export const searchCampaignMasterParticipantBlacklistApi = (
  params: ISearchCampaignMasterParticipantBlacklistParams
) => {
  return new Promise<{ data: ICampaignMasterParticipantBlacklistGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: ICampaignMasterParticipantBlacklistGetApi[] }>(
        "/api/v1/campaign-master-participant-blacklist/list",
        {
          params: {
            created_at_from: params.from,
            created_at_to: params.to,
            id: params.id,
            email: params.email,
            check_email: params.check_email,
            phone: params.phone,
            full_name: params.full_name,
            json_metadata: params.json_metadata,
            updated_at: params.updated_at,
            created_at: params.created_at,
            status_email: params.status_email,
          },
        }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
