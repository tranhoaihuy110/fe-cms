import { TableCell, TableRow } from "../../index";

import { ITableHeaderProps } from "./index";

export const TableHeader = <T,>({
  columns,
  onSort,
  renderSortIcon,
}: ITableHeaderProps<T>) => {
  return (
    <thead className="border-b border-gray-100 dark:border-white/[0.05]">
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={String(column.key)}
            isHeader
            className={`px-2 py-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap ${
              column.key === "actions" ? "text-center" : ""
            }`}
          >
            {column.key === "actions" ? (
              <span className="inline-block">{column.header}</span>
            ) : (
              <span
                className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 flex items-center"
                onClick={() => onSort(column.key)}
              >
                {column.header} {renderSortIcon(column.key)}
              </span>
            )}
          </TableCell>
        ))}
      </TableRow>
    </thead>
  );
};
