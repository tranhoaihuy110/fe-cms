import { Table, TableBody, TableCell, TableRow } from "../../index";
import { TableHeader } from "../table-header/table-header.table";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { ITableComponentProps } from "./index";
import { ActionButtons } from "../action-buttons/action-buttons.table";

export const TableComponent = <T,>({
  data,
  columns,
  onEdit,
  onDelete,
  sortConfig,
  handleSort,
  hideEdit = false,
  hideDelete = false,
}: ITableComponentProps<T>) => {
  const renderSortIcon = (key: keyof T) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowUp size={14} className="inline ml-1" />
      ) : (
        <ArrowDown size={14} className="inline ml-1" />
      );
    }
    return <ArrowUpDown size={14} className="inline ml-1 text-gray-400" />;
  };

  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-full">
        <TableHeader
          columns={columns}
          onSort={handleSort}
          renderSortIcon={renderSortIcon}
        />
        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {data.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column, colIndex) => {
                const isActionsColumn = column.key === "actions";
                return (
                  <TableCell
                    key={colIndex}
                    className={`px-5 py-3 text-theme-sm text-gray-700 dark:text-gray-300 whitespace-nowrap  ${
                      isActionsColumn
                        ? "sticky right-0 bg-white dark:bg-gray-900 z-10 min-w-[100px] "
                        : ""
                    }`}
                  >
                    {isActionsColumn ? (
                      <ActionButtons
                        item={item}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        hideEdit={hideEdit}
                        hideDelete={hideDelete}
                      />
                    ) : column.render ? (
                      column.render(item)
                    ) : (
                      (item[column.key] as string | number | undefined) || ""
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
