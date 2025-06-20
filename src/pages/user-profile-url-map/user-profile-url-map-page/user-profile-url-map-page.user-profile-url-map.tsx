import {
  PageMeta,
} from "../../../components/index";
import {UserProfileUrlMapTable} from "../index";

export const UserProfileUrlMapsTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <UserProfileUrlMapTable />
      </div>
    </>
  );
};
