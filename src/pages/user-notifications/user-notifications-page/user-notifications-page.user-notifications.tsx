import {
  PageMeta,
} from "../../../components/index";
import {UserNotificationsTable} from "../index";

export const UserNotificationsTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <UserNotificationsTable />
      </div>
    </>
  );
};
