import {
    PageMeta,
  } from "../../../components/index";
  import { PotentialLeadActionTable } from "../index";
  
  export const PotentialLeadActionTables = () => {
    return (
      <>
        <PageMeta
          title="Druce"
          description="Druce"
        />
        <div className="space-y-6">
            <PotentialLeadActionTable />
        </div>
      </>
    );
  };
  