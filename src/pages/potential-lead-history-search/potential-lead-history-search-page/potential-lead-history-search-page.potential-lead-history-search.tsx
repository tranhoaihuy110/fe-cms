import {
    PageMeta,
  } from "../../../components/index";
  import { PotentialLeadHistorySearchTable } from "../index";
  
  export const PotentialLeadHistoryTable = () => {
    return (
      <>
        <PageMeta
          title="Druce"
          description="Druce"
        />
        <div className="space-y-6">
            <PotentialLeadHistorySearchTable />
        </div>
      </>
    );
  };
  