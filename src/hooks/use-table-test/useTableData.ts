import { useEffect, useState } from "react";
import { IUseTableDataProps, IUseTableDataReturn } from "./index";
import { usePagination } from "./usePagination";
import { useFilters } from "./useFilters";
import { useSorting } from "./useSorting";
import { useModal } from "./useModal";
import { useDataOperations } from "./useDataOperations";

export const useTableData = <
  T,
  FormT,
  FetchParams = { page: number; size: number },
  SearchParams = any,
  SortParams = any,
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
  initialFormData,
  mapResponse,
  filterConfig = [],
  fieldMapping,
}: IUseTableDataProps<
  T,
  FormT,
  FetchParams,
  SearchParams,
  SortParams,
  FetchByIdParams
>): IUseTableDataReturn<T, FormT> => {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    itemsPerPageOptions,
    handleItemsPerPageChange,
  } = usePagination();

  const {
    filters,
    setFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    timeFilter,
    setTimeFilter,
    isFilterActive,
    setIsFilterActive,
    handleTimeFilter,
    handleStartDateChange,
    handleEndDateChange,
    handleClearFilter,
    handleReset,
  } = useFilters(filterConfig);

  const { sortConfig, setSortConfig } = useSorting<T>();
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const {
    isModalOpen,
    modalMode,
    currentItem,
    isDeleteModalOpen,
    itemToDelete,
    openAddModal,
    openEditModal: openEditModalBase,
    openDetailModal: openDetailModalBase,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
  } = useModal<FormT>(initialFormData);

  const {
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
  } = useDataOperations<
    T,
    FormT,
    FetchParams,
    SearchParams,
    SortParams,
    FetchByIdParams
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
    initialFormData,
    fieldMapping,
  });

  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string | number | null>
  >({});

  useEffect(() => {
    const loadDataWithoutLoading = async () => {
      try {
        await loadData(
          currentPage,
          itemsPerPage,
          timeFilter,
          startDate,
          endDate,
          sortConfig,
          appliedFilters
        );
      } catch (err) {
        const error = err as { message: string };
        setError(error.message);
      }
    };
    loadDataWithoutLoading();
  }, [currentPage, itemsPerPage, timeFilter, startDate, endDate, sortConfig]);

  useEffect(() => {
    const hasFilter =
      !!timeFilter || Object.values(filters).some((value) => value !== null);
    setIsFilterActive(hasFilter);
    setFilteredData(tableData);
  }, [tableData, timeFilter, filters, setIsFilterActive, setFilteredData]);

  const wrappedHandleSort = async (key: keyof T) => {
    setCurrentPage(1);
    const hasFilters = Object.values(appliedFilters).some(
      (value) => value !== null
    );

    try {
      setIsOperationLoading(true); // Thêm dòng này
      let response: { data: T[]; total?: number };
      if (hasFilters || timeFilter) {
        const { from, to } = timeFilter
          ? getDateRange(timeFilter, startDate, endDate)
          : { from: "", to: "" };

        const searchParams = {
          page: 1,
          size: itemsPerPage,
          ...appliedFilters,
          ...(from && to ? { from, to } : {}),
        } as SearchParams;

        response = mapResponse(await searchData(searchParams));
      } else {
        response = mapResponse(
          await sortData({
            page: 1,
            size: itemsPerPage,
            sort: { field: String(key), direction: sortConfig.direction },
          } as SortParams)
        );
      }
      setTableData(response.data);
      setFilteredData(response.data);
      setTotalItems(response.total || 0);
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
      setError(null);
    } catch (err) {
      const error = err as { message: string };
      setError(error.message);
    } finally {
      setIsOperationLoading(false); // Thêm dòng này
    }
  };

  const wrappedHandleSearch = async () => {
    setTimeFilter(null);
    setStartDate(null);
    setEndDate(null);
    setAppliedFilters(filters);
    setIsOperationLoading(true); // Thêm dòng này
    try {
      await handleSearch(currentPage, itemsPerPage, filters);
      setIsFilterActive(Object.values(filters).some((value) => value !== null));
    } finally {
      setIsOperationLoading(false); // Thêm dòng này
    }
  };

  const wrappedHandleReset = () => {
    handleReset();
    setSortConfig({ key: null, direction: "asc" });
    setCurrentPage(1);
    setAppliedFilters({});
  };

  const paginatedData = filteredData;
  const effectiveTotalItems = totalItems;

  return {
    isOperationLoading,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    itemsPerPageOptions,
    tableData,
    filteredData,
    totalItems,
    isModalOpen,
    modalMode,
    currentItem,
    isDeleteModalOpen,
    itemToDelete,
    filters,
    setFilter,
    sortConfig,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    timeFilter,
    setTimeFilter,
    loading,
    error,
    isFilterActive,
    handleTimeFilter,
    handleItemsPerPageChange,
    handleStartDateChange,
    handleEndDateChange,
    openAddModal,
    openEditModal: (item: T) =>
      openEditModalBase(
        fetchItemById as (id: string) => Promise<FormT>,
        String(item[fieldMapping.id])
      ),
    closeModal,
    openDetailModal: (item: T) =>
      openDetailModalBase(
        fetchItemById as (id: string) => Promise<FormT>,
        String(item[fieldMapping.id])
      ),
    openDeleteModal: (item: T) =>
      openDeleteModal({ ...item, id: String(item[fieldMapping.id]) }),
    closeDeleteModal,
    handleAddItem: (item: FormT) => handleAddItem(item, itemsPerPage),
    handleEditItem: (item: FormT) =>
      handleEditItem(item, currentPage, itemsPerPage),
    handleDeleteItem: () => handleDeleteItem(itemToDelete, itemsPerPage),
    handleSearch: wrappedHandleSearch,
    handleReset: wrappedHandleReset,
    handleSort: wrappedHandleSort,
    handleClearFilter,
    paginatedData,
    effectiveTotalItems,
  };
};
