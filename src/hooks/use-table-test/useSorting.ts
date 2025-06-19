/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { IUseTableDataProps } from "./index";

export const useSorting = <T>() => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const isSortingRef = useRef(false); // Thêm cờ kiểm soát sort

  const handleSort = async (
    key: keyof T,
    sortData: IUseTableDataProps<T, any>["sortData"],
    page: number,
    itemsPerPage: number
  ) => {
    if (isSortingRef.current) return; // Ngăn gọi nhiều lần
    isSortingRef.current = true;

    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      setSortConfig({ key: null, direction: "asc" }); // Reset nếu đã desc
      isSortingRef.current = false;
      return;
    }

    setSortConfig({ key, direction });

    try {
      const sortField = String(key);
      const data = await sortData({
        page,
        size: itemsPerPage,
        sort: { field: sortField, direction },
      } as any);
      return data;
    } catch (err) {
      const error = err as { message: string };
      toast.error(error.message);
      throw err;
    } finally {
      isSortingRef.current = false; // Đặt lại cờ
    }
  };

  return {
    sortConfig,
    setSortConfig,
    handleSort,
  };
};
