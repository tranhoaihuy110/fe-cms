import {
  PageMeta,
} from "../../../components/index";
import { LeadActivityTable } from "../index";

export const LeadActivityTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <LeadActivityTable />
      </div>
    </>
  );
};
