import { PageMeta } from "../../../components/index";
import { PropertyFloorsTable } from "../index";

export const PropertyFloors = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
        <PropertyFloorsTable />
      </div>
    </>
  );
};
