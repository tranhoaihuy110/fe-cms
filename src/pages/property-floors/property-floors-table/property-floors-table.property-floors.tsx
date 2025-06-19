import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { LoadingMore } from "../../../components";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getPropertyFloorsApi,
  searchPropertyFloorsApi,
  sortPropertyFloorsApi,
  postPropertyFloorsApi,
  patchPropertyFloorsApi,
  deletePropertyFloorsApi,
} from "../../../services";
import { IPropertyFloorsTableProps } from "./index";
import {
  IPropertyFloorsGetApi,
  IPropertyFloorsPatchApi,
  IPropertyFloorsPostApi,
} from "../../../models";
import {
  PropertyFloorsFormModal,
  DeletePropertyFloorsConfirmationModal,
} from "../index";

export const PropertyFloorsTable: React.FC<IPropertyFloorsTableProps> = (
  props
) => {
  const { children = "" } = props;

  const initialFormData: IPropertyFloorsGetApi = {
    id: "",
    property_id: "",
    created_at: "",
    floor_type: "",
    floor_name: "",
    status: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "property_id", label: "Property ID", type: "text" },
    { key: "floor_type", label: "Floor Type", type: "text" },
    { key: "floor_name", label: "Floor Name", type: "text" },
    { key: "status", label: "Status", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof IPropertyFloorsGetApi,
    property_id: "property_id" as keyof IPropertyFloorsGetApi,
    floor_type: "floor_type" as keyof IPropertyFloorsGetApi,
    floor_name: "floor_name" as keyof IPropertyFloorsGetApi,
    status: "status" as keyof IPropertyFloorsGetApi,
    created_at: "created_at" as keyof IPropertyFloorsGetApi,
  };

  const mapToForm = (data: IPropertyFloorsGetApi): IPropertyFloorsGetApi => ({
    id: data.id || "",
    property_id: data.property_id || "",
    floor_type: data.floor_type || "",
    floor_name: data.floor_name || "",
    status: data.status || "",
    created_at: data.created_at || "",
  });

  const mapFromForm = (
    data: IPropertyFloorsGetApi
  ): Partial<IPropertyFloorsGetApi> => {
    return {
      id: data.id || undefined,
      property_id: data.property_id,
      floor_type: data.floor_type,
      floor_name: data.floor_name,
      status: data.status,
      created_at: data.created_at,
    };
  };

  const mapResponse = (
    response: any
  ): { data: IPropertyFloorsGetApi[]; total?: number } => {
    if (!response || !response.data) {
      return { data: [], total: 0 };
    }
    return {
      data: response.data,
      total: response.pagination?.total || 0,
    };
  };

  const transformToPostData = (
    data: Partial<IPropertyFloorsGetApi>
  ): Partial<IPropertyFloorsPostApi> => {
    return {
      property_id: data.property_id,
      floor_type: data.floor_type,
      floor_name: data.floor_name,
      status: data.status,
    };
  };

  const transformToPatchData = (
    data: Partial<IPropertyFloorsGetApi>
  ): Partial<IPropertyFloorsPatchApi> => {
    return {
      id: data.id,
      property_id: data.property_id,
      floor_type: data.floor_type,
      floor_name: data.floor_name,
      status: data.status,
    };
  };

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    itemsPerPageOptions,
    isModalOpen,
    modalMode,
    currentItem,
    isDeleteModalOpen,
    itemToDelete,
    filters,
    setFilter,
    startDate,
    endDate,
    timeFilter,
    handleTimeFilter,
    handleItemsPerPageChange,
    handleStartDateChange,
    handleEndDateChange,
    handleClearFilter,
    handleSearch,
    handleReset,
    handleSort,
    openAddModal,
    openEditModal,
    openDetailModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
    paginatedData,
    effectiveTotalItems,
    sortConfig,
    loading,
    error,
  } = useTableData<
    IPropertyFloorsGetApi,
    IPropertyFloorsGetApi,
    { page: number; size: number; id?: string },
    {
      page: number;
      size: number;
      id?: string;
      property_id?: string;
      floor_type?: string;
      floor_name?: string;
      status?: string;
      from?: string;
      to?: string;
    },
    {
      page: number;
      size: number;
      sort: { field: string; direction: "asc" | "desc" };
    },
    string
  >({
    fetchData: async ({
      page,
      size,
      id,
    }: {
      page: number;
      size: number;
      id?: string;
    }) => {
      const response = await getPropertyFloorsApi({
        page,
        size,
        id: id || "",
        sort: "created_at,desc",
      });
      console.log("getPropertyFloorsApi response:", response);
      return response;
    },
    searchData: async ({
      size,
      id,
      property_id,
      floor_type,
      floor_name,
      from,
      to,
    }: {
      page: number;
      size: number;
      id?: string;
      property_id?: string;
      floor_type?: string;
      floor_name?: string;
      status?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchPropertyFloorsApi({
        size,
        id,
        property_id,
        floor_type,
        floor_name,
        from,
        to,
      });
      console.log("searchPropertyFloorsApi response:", response);
      return response;
    },
    sortData: async ({
      page,
      size,
      sort,
    }: {
      page: number;
      size: number;
      sort: { field: string; direction: "asc" | "desc" };
    }) => {
      const response = await sortPropertyFloorsApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortPropertyFloorsApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getPropertyFloorsApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("getPropertyFloorsApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Property floor not found");
      }
      return response.data[0];
    },
    addData: async (data: Partial<IPropertyFloorsGetApi>) => {
      const transformedData = transformToPostData(data);
      const response = await postPropertyFloorsApi(transformedData);
      console.log("postPropertyFloorsApi response:", response);
      return response;
    },
    updateData: async (data: Partial<IPropertyFloorsGetApi>) => {
      const transformedData = transformToPatchData(data);
      const response = await patchPropertyFloorsApi(transformedData);
      console.log("patchPropertyFloorsApi response:", response);
      return response;
    },
    deleteData: deletePropertyFloorsApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null ? String(filters.id) : "";
  const searchPropertyIdTerm =
    filters.property_id !== undefined && filters.property_id !== null
      ? String(filters.property_id)
      : "";
  const searchFloorNameTerm =
    filters.floor_name !== undefined && filters.floor_name !== null
      ? String(filters.floor_name)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchPropertyIdTerm = (value: string) =>
    setFilter("property_id", value || null);
  const setSearchFloorNameTerm = (value: string) =>
    setFilter("floor_name", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchPropertyId = () => handleClearFilter("property_id");
  const handleClearSearchFloorName = () => handleClearFilter("floor_name");

  const columns = [
    {
      key: "id" as keyof IPropertyFloorsGetApi,
      header: "ID",
    },
    {
      key: "property_id" as keyof IPropertyFloorsGetApi,
      header: "Property ID",
    },
    {
      key: "floor_type" as keyof IPropertyFloorsGetApi,
      header: "Floor Type",
    },
    {
      key: "floor_name" as keyof IPropertyFloorsGetApi,
      header: "Floor Name",
    },
    {
      key: "status" as keyof IPropertyFloorsGetApi,
      header: "Status",
    },
    {
      key: "created_at" as keyof IPropertyFloorsGetApi,
      header: "Date Created",
      render: (item: IPropertyFloorsGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "actions" as keyof IPropertyFloorsGetApi,
      header: "Actions",
    },
  ];

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <FilterSection
          startDate={startDate}
          setStartDate={handleStartDateChange}
          endDate={endDate}
          setEndDate={handleEndDateChange}
          timeFilter={timeFilter}
          handleTimeFilter={handleTimeFilter}
          searchIdTerm={searchIdTerm}
          setSearchIdTerm={setSearchIdTerm}
          searchNameTerm={searchFloorNameTerm}
          setSearchNameTerm={setSearchFloorNameTerm}
          searchUsernameTerm={searchPropertyIdTerm}
          setSearchUsernameTerm={setSearchPropertyIdTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchFloorName}
          handleClearSearchUsername={handleClearSearchPropertyId}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by Floor Name"
          thirdSearchLabel="Search by Property ID"
          idSearchType="text"
          hidePhoneEmail={true}
        />

        <div className="max-w-full overflow-x-auto">
          {error ? (
            <div className="p-4 text-center text-red-500 dark:text-red-400">
              {error}
            </div>
          ) : !paginatedData || paginatedData.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No property floors found for the selected filters.
            </div>
          ) : (
            <TableComponent
              data={paginatedData}
              columns={columns}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              onDetail={openDetailModal}
              sortConfig={sortConfig}
              handleSort={handleSort}
            />
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-gray-900/50 z-10">
              <LoadingMore />
            </div>
          )}
        </div>

        <PaginationSection
          totalItems={effectiveTotalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      <PropertyFloorsFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeletePropertyFloorsConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        onReset={handleReset}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};
