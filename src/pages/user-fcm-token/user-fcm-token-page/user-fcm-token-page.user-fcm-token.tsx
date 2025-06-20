import {
  PageMeta,
} from "../../../components/index";
import {UserFcmTokenTable} from "../index";

export const UserFcmTokensTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <UserFcmTokenTable />
      </div>
    </>
  );
};
