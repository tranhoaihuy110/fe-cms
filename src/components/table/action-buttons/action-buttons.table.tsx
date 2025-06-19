import { Pencil, Trash2 } from "lucide-react";
import { IActionButtonsProps } from "./index";

export const ActionButtons = <T,>({
  item,
  onEdit,
  onDelete,

  hideEdit = false,
  hideDelete = false,
}: IActionButtonsProps<T>) => {
  return (
    <div className="flex items-center gap-2">
      {onEdit && !hideEdit && (
        <button
          onClick={() => onEdit(item)}
          className="text-blue-500 hover:text-blue-700"
          aria-label="Sửa"
        >
          <Pencil size={16} />
        </button>
      )}
      {onDelete && !hideDelete && (
        <button
          onClick={() => onDelete(item)}
          className="text-red-500 hover:text-red-700"
          aria-label="Xóa"
        >
          <Trash2 size={16} />
        </button>
      )}
      {/* {onDetail && !hideDetail && (
        <button
          onClick={() => onDetail(item)}
          className="text-green-500 hover:text-green-700"
          aria-label="Xem chi tiết"
        >
          <ClipboardList size={16} />
        </button>
      )} */}
    </div>
  );
};
