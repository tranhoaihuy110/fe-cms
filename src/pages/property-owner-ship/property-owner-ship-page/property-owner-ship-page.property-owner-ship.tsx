import {
    PageMeta,
  } from "../../../components/index";
  import { PropertyOwnerShipTable } from "../index";
  
  export const PropertyOwnerShipTables = () => {
    return (
      <>
        <PageMeta
          title="Druce"
          description="Druce"
        />
        <div className="space-y-6">
            <PropertyOwnerShipTable />
        </div>
      </>
    );
  };
  