import { PageMeta } from "../../../components/index";
import { PropertyRoomTable } from "../index";

export const PropertyRoom = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
        <PropertyRoomTable />
      </div>
    </>
  );
};
