import {
    PageMeta,
  } from "../../../components/index";
  import { LeadsourcesTable } from "../index";
  
  export const LeadsourcesTables = () => {
    return (
      <>
        <PageMeta
          title="Druce"
          description="Druce"
        />
        <div className="space-y-6">
            <LeadsourcesTable/>
        </div>
      </>
    );
  };
  