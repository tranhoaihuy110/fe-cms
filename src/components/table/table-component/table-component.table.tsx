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
    <div className="flex w-full">
      <div className="flex-1 overflow-x-auto">
        <Table className="min-w-[100%]">
          <TableHeader
            columns={columns.filter((col) => col.key !== "actions")}
            onSort={handleSort}
            renderSortIcon={renderSortIcon}
          />
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((item, index) => (
              <TableRow key={index}>
                {columns
                  .filter((col) => col.key !== "actions")
                  .map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={`px-2 py-2 text-theme-sm text-gray-700 dark:text-gray-300 whitespace-nowrap`}
                    >
                      {column.render
                        ? column.render(item)
                        : (item[column.key] as string | number | undefined) ||
                          ""}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-[80px] bg-white dark:bg-gray-900 shadow-left border-l border-gray-100 dark:border-white/[0.05]">
        <table className="h-full">
          <thead className="border-b border-gray-100 dark:border-white/[0.05]">
            <tr>
              <th className="px-2 py-2 text-center font-medium text-gray-500 text-theme-xs dark:text-gray-400 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((item, index) => (
              <tr key={index} className="h-full">
                <td className="px-2 py-2 text-center">
                  <ActionButtons
                    item={item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    hideEdit={hideEdit}
                    hideDelete={hideDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
