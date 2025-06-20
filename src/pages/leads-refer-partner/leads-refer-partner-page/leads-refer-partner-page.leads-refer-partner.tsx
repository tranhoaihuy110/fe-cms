import {
    PageMeta,
  } from "../../../components/index";
  import { LeadsReferPartnerTable } from "../index";
  
  export const LeadsReferPartnerTables = () => {
    return (
      <>
        <PageMeta
          title="Druce"
          description="Druce"
        />
        <div className="space-y-6">
            <LeadsReferPartnerTable />
        </div>
      </>
    );
  };
  