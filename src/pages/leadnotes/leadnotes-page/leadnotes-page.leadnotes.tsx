import {
    PageMeta,
  } from "../../../components/index";
  import { LeadNotesTable } from "../index";
  
  export const LeadNotesTables = () => {
    return (
      <>
        <PageMeta
          title="Druce"
          description="Druce"
        />
        <div className="space-y-6">
            <LeadNotesTable />
        </div>
      </>
    );
  };
  