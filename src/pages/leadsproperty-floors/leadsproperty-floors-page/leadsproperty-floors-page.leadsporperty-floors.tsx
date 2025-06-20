import {
  PageMeta,
} from "../../../components/index";
import {LeadPropertyFloorsTable} from "../index";

export const LeadsPropertyFloorsTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <LeadPropertyFloorsTable />
      </div>
    </>
  );
};
