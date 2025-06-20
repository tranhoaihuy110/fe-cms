import {
    PageMeta,
  } from "../../../components/index";
  import { LeadAssignmentTable } from "../index";
  
  export const LeadAssignmentTables = () => {
    return (
      <>
        <PageMeta
          title="Druce"
          description="Druce"
        />
        <div className="space-y-6">
            <LeadAssignmentTable />
        </div>
      </>
    );
  };
  