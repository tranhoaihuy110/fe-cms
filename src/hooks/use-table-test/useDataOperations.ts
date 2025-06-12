import { useState } from "react";
import { toast } from "react-toastify";
import { IUseTableDataProps } from "./index";

export const useDataOperations = <
  T,
  FormT,
  FetchParams,
  SearchParams,
  SortParams,
  FetchByIdParams = string
>({
  fetchData,
  searchData,
  sortData,
  fetchById,
  addData,
  updateData,
  deleteData,
  mapToForm,
  mapFromForm,
  mapResponse,
}: IUseTableDataProps<
  T,
  FormT,
  FetchParams,
  SearchParams,
  SortParams,
  FetchByIdParams
>) => {
  const [tableData, setTableData] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDateRange = (
    filter: string,
    startDate: Date | null,
    endDate: Date | null
  ) => {
    const now = new Date();
    let from: string, to: string;

    switch (filter) {
      case "today": {
        const todayStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            0,
            0,
            0
          )
        );
        const tomorrowStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() + 1,
            0,
            0,
            0
          )
        );
        from = todayStart.toISOString().slice(0, 19).replace("T", " ");
        to = tomorrowStart.toISOString().slice(0, 19).replace("T", " ");
        return { from, to };
      }
      case "yesterday": {
        const yesterdayStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() - 1,
            0,
            0,
            0
          )
        );
        const todayStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            0,
            0,
            0
          )
        );
        from = yesterdayStart.toISOString().slice(0, 19).replace("T", " ");
        to = todayStart.toISOString().slice(0, 19).replace("T", " ");
        return { from, to };
      }
      case "last7days": {
        const last7daysStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() - 7,
            0,
            0,
            0
          )
        );
        const today = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            0,
            0,
            0
          )
        );
        from = last7daysStart.toISOString().slice(0, 19).replace("T", " ");
        to = today.toISOString().slice(0, 19).replace("T", " ");
        return { from, to };
      }
      case "thisweek": {
        const thisWeekStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() - ((now.getUTCDay() + 6) % 7),
            0,
            0,
            0
          )
        );
        const nextWeekStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() - ((now.getUTCDay() + 6) % 7) + 7,
            0,
            0,
            0
          )
        );
        from = thisWeekStart.toISOString().slice(0, 19).replace("T", " ");
        to = nextWeekStart.toISOString().slice(0, 19).replace("T", " ");
        return { from, to };
      }
      case "last30days": {
        const last30daysStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() - 30,
            0,
            0,
            0
          )
        );
        const todayEnd = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() + 1,
            0,
            0,
            0
          )
        );
        from = last30daysStart.toISOString().slice(0, 19).replace("T", " ");
        to = todayEnd.toISOString().slice(0, 19).replace("T", " ");
        return { from, to };
      }
      case "thismonth": {
        const firstDayOfMonth = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0)
        );
        const firstDayOfNextMonth = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0)
        );
        from = firstDayOfMonth.toISOString().slice(0, 19).replace("T", " ");
        to = firstDayOfNextMonth.toISOString().slice(0, 19).replace("T", " ");
        return { from, to };
      }
      case "lastmonth": {
        const firstDayOfLastMonth = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1, 0, 0, 0)
        );
        const firstDayOfThisMonth = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0)
        );
        from = firstDayOfLastMonth.toISOString().slice(0, 19).replace("T", " ");
        to = firstDayOfThisMonth.toISOString().slice(0, 19).replace("T", " ");
        return { from, to };
      }
      case "custom":
        if (startDate && endDate) {
          const adjustedStartDate = new Date(
            startDate.getTime() - startDate.getTimezoneOffset() * 60000
          );
          const adjustedEndDate = new Date(
            endDate.getTime() - endDate.getTimezoneOffset() * 60000
          );
          from = adjustedStartDate.toISOString().slice(0, 19).replace("T", " ");
          to = adjustedEndDate.toISOString().slice(0, 19).replace("T", " ");
          return { from, to };
        }
        throw new Error("Start date or end date is not set for custom filter.");
      default:
        return { from: "", to: "" };
    }
  };

  const loadData = async (
    currentPage: number,
    itemsPerPage: number,
    timeFilter: string | null,
    startDate: Date | null,
    endDate: Date | null,
    sortConfig: { key: keyof T | null; direction: "asc" | "desc" },
    appliedFilters: Record<string, string | number | null> = {}
  ) => {
    setLoading(true);
    try {
      const size = itemsPerPage;
      const page = currentPage;
      let response: { data: T[]; total?: number };

      const hasTimeFilter = timeFilter;
      const hasFilters = Object.values(appliedFilters).some(
        (value) => value !== null
      );

      if (hasTimeFilter || hasFilters) {
        const { from, to } = hasTimeFilter
          ? getDateRange(timeFilter || "", startDate, endDate)
          : { from: "", to: "" };

        const searchParams = {
          page,
          size,
          ...appliedFilters,
          ...(from && to ? { from, to } : {}),
        } as SearchParams;

        response = mapResponse(await searchData(searchParams));
      } else if (sortConfig.key) {
        const sortField = String(sortConfig.key);
        response = mapResponse(
          await sortData({
            page,
            size,
            sort: { field: sortField, direction: sortConfig.direction },
          } as SortParams)
        );
      } else {
        response = mapResponse(await fetchData({ page, size } as FetchParams));
      }

      setTableData(response.data);
      setFilteredData(response.data);
      setTotalItems(response.total || 0);
      setError(null);
    } catch (err) {
      const error = err as { message: string };
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchItemById = async (id: FetchByIdParams): Promise<FormT> => {
    try {
      const itemData = await fetchById(id);
      return mapToForm(itemData);
    } catch (err) {
      const error = err as { message: string };
      toast.error(`Failed to fetch item: ${error.message}`);
      throw err;
    }
  };

  const handleAddItem = async (item: FormT, itemsPerPage: number) => {
    try {
      const formattedItem = mapFromForm(item);
      await addData!(formattedItem);
      const response = mapResponse(
        await fetchData({
          page: 1,
          size: itemsPerPage,
        } as FetchParams)
      );
      setTableData(response.data);
      setFilteredData(response.data);
      setTotalItems(response.total || 0);
    } catch (err) {
      const error = err as {
        message: string;
        statusCode?: number;
        error?: string;
      };
      toast.error(
        `Failed to add item: ${error.message || error.error || "Unknown error"}`
      );
    }
  };

  const handleEditItem = async (
    item: FormT,
    currentPage: number,
    itemsPerPage: number
  ) => {
    try {
      const formattedItem = mapFromForm(item);
      await updateData!(formattedItem);
      const response = mapResponse(
        await fetchData({
          page: currentPage,
          size: itemsPerPage,
        } as FetchParams)
      );
      setTableData(response.data);
      setFilteredData(response.data);
      setTotalItems(response.total || 0);
    } catch (err) {
      const error = err as { message: string; error?: string };
      toast.error(
        `Failed to update item: ${
          error.message || error.error || "Unknown error"
        }`
      );
    }
  };

  const handleDeleteItem = async (
    itemToDelete: any,
    itemsPerPage: number
  ) => {
    if (!itemToDelete) return;
    try {
      setLoading(true);
      await deleteData!(String(itemToDelete.id));
      const response = mapResponse(
        await fetchData({
          page: 1,
          size: itemsPerPage,
        } as FetchParams)
      );
      setTableData(response.data);
      setFilteredData(response.data);
      setTotalItems(response.total || 0);
    } catch (err) {
      const error = err as { message: string; error?: string };
        toast.error(
          `Failed to delete item: ${
            error.message || error.error || "Unknown error"
          }`
        );
      } finally {
        setLoading(false);
      }
    };
  
    const handleSearch = async (
      currentPage: number,
      itemsPerPage: number,
      filters: Record<string, string | number | null>
    ) => {
      setLoading(true);
      try {
        const response = mapResponse(
          await searchData({
            page: currentPage,
            size: itemsPerPage,
            ...filters,
          } as SearchParams)
        );
        setTableData(response.data);
        setFilteredData(response.data);
        setTotalItems(response.total || 0);
        setError(null);
      } catch (err) {
        const error = err as { message: string };
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return {
      tableData,
      filteredData,
      totalItems,
      loading,
      error,
      setTableData,
      setFilteredData,
      setTotalItems,
      setError,
      loadData,
      fetchItemById,
      handleAddItem,
      handleEditItem,
      handleDeleteItem,
      handleSearch,
      getDateRange,
    };
  };