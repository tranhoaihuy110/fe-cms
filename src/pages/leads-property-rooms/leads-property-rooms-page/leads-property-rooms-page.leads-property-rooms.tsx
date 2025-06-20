import {
  PageMeta,
} from "../../../components/index";
import {LeadsPropertyRoomsTable} from "../index";

export const LeadsPropertyRoomsTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <LeadsPropertyRoomsTable />
      </div>
    </>
  );
};
