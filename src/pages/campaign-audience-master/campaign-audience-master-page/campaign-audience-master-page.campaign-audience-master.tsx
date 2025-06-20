import {
  PageMeta,
} from "../../../components/index";
import { CampaignAudienceMasterTable } from "../index";

export const CampaignAudienceMasters = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <CampaignAudienceMasterTable />
      </div>
    </>
  );
};
