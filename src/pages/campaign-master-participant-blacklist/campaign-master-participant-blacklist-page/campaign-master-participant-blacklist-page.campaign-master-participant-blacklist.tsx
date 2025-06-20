import {
  PageMeta,
} from "../../../components/index";
import { CampaignMasterParticipantBlacklistTable } from "../index";

export const CampaignMasterParticipantBlacklists = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <CampaignMasterParticipantBlacklistTable />
      </div>
    </>
  );
};
