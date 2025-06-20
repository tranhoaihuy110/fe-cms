import {
    PageMeta,
  } from "../../../components/index";
  import { PropertiesTable } from "../index";
  
  export const PropertyTable = () => {
    return (
      <>
        <PageMeta
          title="Druce"
          description="Druce"
        />
        <div className="space-y-6">
            <PropertiesTable />
        </div>
      </>
    );
  };
  