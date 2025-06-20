import {
  PageMeta,
} from "../../../components/index";
import { CategoryTable } from "../table-category/index";

export const CategoryTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <CategoryTable />
      </div>
    </>
  );
};
