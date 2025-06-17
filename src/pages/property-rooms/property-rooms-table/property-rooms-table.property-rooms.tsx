import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getPropertyRoomApi,
  searchPropertyRoomApi,
  sortPropertyRoomApi,
  postPropertyRoomApi,
  patchPropertyRoomApi,
  deletePropertyRoomApi,
} from "../../../services";
import { IPropertyRoomTableProps } from "./index";
import {
  IPropertyRoomGetApi,
  IPropertyRoomPatchApi,
  IPropertyRoomPostApi,
} from "../../../models";
import {
  PropertyRoomFormModal,
  DeletePropertyRoomConfirmationModal,
} from "../index";

export const PropertyRoomTable: React.FC<IPropertyRoomTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IPropertyRoomGetApi = {
    id: "",
    property_id: "",
    floor_id: "",
    created_at: "",
    room_type: "",
    room_name: "",
    status: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "property_id", label: "Property ID", type: "text" },
    { key: "floor_id", label: "Floor ID", type: "text" },
    { key: "room_type", label: "Room Type", type: "text" },
    { key: "room_name", label: "Room Name", type: "text" },
    { key: "status", label: "Status", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof IPropertyRoomGetApi,
    property_id: "property_id" as keyof IPropertyRoomGetApi,
    floor_id: "floor_id" as keyof IPropertyRoomGetApi,
    room_type: "room_type" as keyof IPropertyRoomGetApi,
    room_name: "room_name" as keyof IPropertyRoomGetApi,
    status: "status" as keyof IPropertyRoomGetApi,
    created_at: "created_at" as keyof IPropertyRoomGetApi,
  };

  const mapToForm = (data: IPropertyRoomGetApi): IPropertyRoomGetApi => ({
    id: data.id || "",
    property_id: data.property_id || "",
    floor_id: data.floor_id || "",
    room_type: data.room_type || "",
    room_name: data.room_name || "",
    status: data.status || "",
    created_at: data.created_at || "",
  });

  const mapFromForm = (
    data: IPropertyRoomGetApi
  ): Partial<IPropertyRoomGetApi> => {
    return {
      id: data.id || undefined,
      property_id: data.property_id,
      floor_id: data.floor_id,
      room_type: data.room_type,
      room_name: data.room_name,
      status: data.status,
      created_at: data.created_at,
    };
  };

  const mapResponse = (
    response: any
  ): { data: IPropertyRoomGetApi[]; total?: number } => {
    if (!response || !response.data) {
      return { data: [], total: 0 };
    }
    return {
      data: response.data,
      total: response.pagination?.total || 0,
    };
  };

  const transformToPostData = (
    data: Partial<IPropertyRoomGetApi>
  ): Partial<IPropertyRoomPostApi> => {
    return {
      property_id: data.property_id,
      floor_id: data.floor_id,
      room_type: data.room_type,
      room_name: data.room_name,
      status: data.status,
    };
  };

  const transformToPatchData = (
    data: Partial<IPropertyRoomGetApi>
  ): Partial<IPropertyRoomPatchApi> => {
    return {
      id: data.id,
      property_id: data.property_id,
      floor_id: data.floor_id,
      room_type: data.room_type,
      room_name: data.room_name,
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
    IPropertyRoomGetApi,
    IPropertyRoomGetApi,
    { page: number; size: number; id?: string; sort?: string },
    {
      page: number;
      size: number;
      id?: string;
      property_id?: string;
      floor_id?: string;
      room_type?: string;
      room_name?: string;
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
      sort?: string;
    }) => {
      const response = await getPropertyRoomApi({
        page,
        size,
        id: id || "",
        sort: "created_at,desc",
      });
      console.log("getPropertyRoomApi response:", response);
      return response;
    },
    searchData: async ({
      size,
      id,
      property_id,
      floor_id,
      room_type,
      room_name,
      from,
      to,
    }: {
      page: number;
      size: number;
      id?: string;
      property_id?: string;
      floor_id?: string;
      room_type?: string;
      room_name?: string;
      status?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchPropertyRoomApi({
        size,
        id,
        property_id,
        floor_id,
        room_type,
        room_name,
        from,
        to,
      });
      console.log("searchPropertyRoomApi response:", response);
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
      const response = await sortPropertyRoomApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortPropertyRoomApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getPropertyRoomApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("getPropertyRoomApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Property room not found");
      }
      return response.data[0];
    },
    addData: async (data: Partial<IPropertyRoomGetApi>) => {
      const transformedData = transformToPostData(data);
      const response = await postPropertyRoomApi(transformedData);
      console.log("postPropertyRoomApi response:", response);
      return response;
    },
    updateData: async (data: Partial<IPropertyRoomGetApi>) => {
      const transformedData = transformToPatchData(data);
      const response = await patchPropertyRoomApi(transformedData);
      console.log("patchPropertyRoomApi response:", response);
      return response;
    },
    deleteData: deletePropertyRoomApi,
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
  const searchRoomNameTerm =
    filters.room_name !== undefined && filters.room_name !== null
      ? String(filters.room_name)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchPropertyIdTerm = (value: string) =>
    setFilter("property_id", value || null);
  const setSearchRoomNameTerm = (value: string) =>
    setFilter("room_name", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchPropertyId = () => handleClearFilter("property_id");
  const handleClearSearchRoomName = () => handleClearFilter("room_name");

  const columns = [
    {
      key: "id" as keyof IPropertyRoomGetApi,
      header: "ID",
    },
    {
      key: "property_id" as keyof IPropertyRoomGetApi,
      header: "Property ID",
    },
    {
      key: "floor_id" as keyof IPropertyRoomGetApi,
      header: "Floor ID",
    },
    {
      key: "room_type" as keyof IPropertyRoomGetApi,
      header: "Room Type",
    },
    {
      key: "room_name" as keyof IPropertyRoomGetApi,
      header: "Room Name",
    },
    {
      key: "status" as keyof IPropertyRoomGetApi,
      header: "Status",
    },
    {
      key: "created_at" as keyof IPropertyRoomGetApi,
      header: "Date Created",
      render: (item: IPropertyRoomGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "actions" as keyof IPropertyRoomGetApi,
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
          searchNameTerm={searchRoomNameTerm}
          setSearchNameTerm={setSearchRoomNameTerm}
          searchUsernameTerm={searchPropertyIdTerm}
          setSearchUsernameTerm={setSearchPropertyIdTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchRoomName}
          handleClearSearchUsername={handleClearSearchPropertyId}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by Room Name"
          thirdSearchLabel="Search by Property ID"
          idSearchType="text"
          hidePhoneEmail={true}
        />

        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Loading...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500 dark:text-red-400">
              {error}
            </div>
          ) : !paginatedData || paginatedData.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No property rooms found for the selected filters.
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
      <PropertyRoomFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeletePropertyRoomConfirmationModal
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
