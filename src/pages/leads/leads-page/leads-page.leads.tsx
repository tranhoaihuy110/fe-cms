import {
    PageMeta,
  } from "../../../components/index";
  import { LeadTable } from "../index";
  
  export const LeadTables = () => {
    return (
      <>
        <PageMeta
          title="Druce"
          description="Druce"
        />
        <div className="space-y-6">
            <LeadTable />
        </div>
      </>
    );
  };
  