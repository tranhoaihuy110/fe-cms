/* eslint-disable @typescript-eslint/no-explicit-any */
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
  TotalParams = any,
  SearchParams = any,
  SortParams = any,
  FetchByIdParams = string
>({
  fetchData,
  fetchTotal,
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
  TotalParams,
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

  const { sortConfig, setSortConfig, handleSort } = useSorting<T>();

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
    TotalParams,
    SearchParams,
    SortParams,
    FetchByIdParams
  >({
    fetchData,
    fetchTotal,
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
  const [allData, setAllData] = useState<T[]>([]); // Cache toàn bộ dữ liệu đã fetch
  const [fetchedPages, setFetchedPages] = useState<Set<number>>(new Set()); // Theo dõi các trang đã fetch

  // Hàm tính toán số trang cần fetch thêm dựa trên itemsPerPage mới
  const calculatePagesToFetch = (newItemsPerPage: number) => {
    const totalItemsNeeded = currentPage * newItemsPerPage;
    const itemsAvailable = allData.length;
    if (totalItemsNeeded <= itemsAvailable) {
      return []; // Đã có đủ dữ liệu trong cache
    }
    const pagesNeeded = Math.ceil(totalItemsNeeded / newItemsPerPage);
    const pagesToFetch: number[] = [];
    for (let page = 1; page <= pagesNeeded; page++) {
      if (!fetchedPages.has(page)) {
        pagesToFetch.push(page);
      }
    }
    return pagesToFetch;
  };

  // Hàm fetch dữ liệu bổ sung
  const fetchAdditionalData = async (pages: number[], size: number) => {
    setError(null);
    try {
      const fetchPromises = pages.map(async (page) => {
        const response = await loadData(
          page,
          size,
          timeFilter,
          startDate,
          endDate,
          sortConfig,
          appliedFilters
        );
        return mapResponse(response).data;
      });
      const newDataArrays = await Promise.all(fetchPromises);
      const newData = newDataArrays.flat();
      setAllData((prev) => [...prev, ...newData]);
      setFetchedPages((prev) => {
        const newSet = new Set(prev);
        pages.forEach((page) => newSet.add(page));
        return newSet;
      });
      setTableData(newDataArrays.flat());
      setFilteredData(newDataArrays.flat());
    } catch (err) {
      setError("Failed to fetch additional data");
    }
  };

  // Điều chỉnh handleItemsPerPageChange để sử dụng cache
  const handleItemsPerPageChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset về trang 1

    // Kiểm tra xem có cần fetch thêm dữ liệu không
    const pagesToFetch = calculatePagesToFetch(newItemsPerPage);
    if (pagesToFetch.length > 0) {
      await fetchAdditionalData(pagesToFetch, newItemsPerPage);
    }
  };

  // useEffect để load dữ liệu ban đầu
  useEffect(() => {
    const loadInitialData = async () => {
      if (fetchedPages.has(currentPage)) {
        // Dữ liệu đã có trong cache, không cần fetch lại
        return;
      }
      await loadData(
        currentPage,
        itemsPerPage,
        timeFilter,
        startDate,
        endDate,
        sortConfig,
        appliedFilters
      );
      const response = await fetchData({ page: currentPage, size: itemsPerPage } as FetchParams);
      const newData = mapResponse(response).data;
      setAllData((prev) => [...prev, ...newData]);
      setFetchedPages((prev) => new Set(prev).add(currentPage));
      setTableData(newData);
      setFilteredData(newData);
      setTotalItems(await fetchTotal({} as TotalParams));
    };
    loadInitialData();
  }, [currentPage, timeFilter, startDate, endDate, sortConfig, appliedFilters]);

  useEffect(() => {
    const hasFilter =
      !!timeFilter || Object.values(filters).some((value) => value !== null);
    setIsFilterActive(hasFilter);
    setFilteredData(allData); // Sử dụng allData thay vì tableData
  }, [allData, timeFilter, filters, setIsFilterActive, setFilteredData]);

  const wrappedHandleSort = async (key: keyof T) => {
    setCurrentPage(1);
    const hasFilters = Object.values(appliedFilters).some(
      (value) => value !== null
    );

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

      const data = await searchData(searchParams);
      setAllData(mapResponse(data).data); // Cập nhật allData
      setTableData(data);
      setFilteredData(data);
      setFetchedPages(new Set([1]));
      setTotalItems(
        await fetchTotal({
          ...appliedFilters,
          ...(from && to ? { from, to } : {}),
        } as TotalParams)
      );
    } else {
      const data = await handleSort(key, sortData, 1, itemsPerPage);
      setAllData(mapResponse(data).data); // Cập nhật allData
      setTableData(data);
      setFilteredData(data);
      setFetchedPages(new Set([1]));
      setTotalItems(await fetchTotal({} as TotalParams));
    }
    setError(null);
  };

  const wrappedHandleSearch = async () => {
    setTimeFilter(null);
    setStartDate(null);
    setEndDate(null);
    setAppliedFilters(filters);
    await handleSearch(currentPage, itemsPerPage, filters);
    setIsFilterActive(Object.values(filters).some((value) => value !== null));
    setAllData(filteredData); // Cập nhật allData sau search
    setFetchedPages(new Set([currentPage]));
  };

  const wrappedHandleReset = () => {
    handleReset();
    setSortConfig({ key: null, direction: "asc" });
    setCurrentPage(1);
    setAppliedFilters({});
    setAllData([]); // Reset cache
    setFetchedPages(new Set());
  };

  // Cắt dữ liệu từ allData để hiển thị theo itemsPerPage
  const paginatedData = allData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const effectiveTotalItems = totalItems;

  return {
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
    handleDeleteItem: () =>
      handleDeleteItem(itemToDelete, currentPage),
    handleSearch: wrappedHandleSearch,
    handleReset: wrappedHandleReset,
    handleSort: wrappedHandleSort,
    handleClearFilter,
    paginatedData,
    effectiveTotalItems,
  };
};