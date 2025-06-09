import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { IMetaDataApi } from "../../../../models";
import { searchMetaDataApi } from "../../../../services";
import { ICategoryFormModalProps } from "./index";
import { toast } from "react-toastify";
import { IFormField } from "../../../../components";
export const CategoryFormModal: React.FC<ICategoryFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onReset,
  mode,
  category,
  children = "",
}) => {
  const [apiData, setApiData] = useState<IMetaDataApi | undefined>(
    typeof category === "object" && category !== null ? category : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && category?.id) {
      const fetchCategoryDetails = async () => {
        try {
          setApiData(undefined);
          const params = {
            data_type: "category",
            page: 1,
            size: 1,
            id: String(category.id),
          };
          const results = await searchMetaDataApi(params);
          console.log("Category details from API:", results);

          if (results.length > 0) {
            const fetchedCategory = results[0];
            setApiData({
              id: fetchedCategory.id || category.id || "",
              data_type: fetchedCategory.data_type || category.data_type || "",
              data_code: fetchedCategory.data_code || category.data_code || "",
              data_title:
                fetchedCategory.data_title || category.data_title || "",
              name: fetchedCategory.name || category.name || "",
              data_parent_id:
                fetchedCategory.data_parent_id ||
                category.data_parent_id ||
                "0",
              data_image:
                fetchedCategory.data_image || category.data_image || "",
              data_desc: fetchedCategory.data_desc || category.data_desc || "",
              data_parent_id_v2:
                fetchedCategory.data_parent_id_v2 ||
                category.data_parent_id_v2 ||
                "",
            });
          } else {
            setApiData({
              id: category.id || "",
              data_type: category.data_type || "",
              data_code: category.data_code || "",
              data_title: category.data_title || "",
              name: category.name || "",
              data_parent_id: category.data_parent_id || "0",
              data_image: category.data_image || "",
              data_desc: category.data_desc || "",
              data_parent_id_v2: category.data_parent_id_v2 || "",
            });
            toast.warn("No data returned from API, using provided data.");
          }
        } catch (error) {
          setApiData({
            id: category.id || "",
            data_type: category.data_type || "",
            data_code: category.data_code || "",
            data_title: category.data_title || "",
            name: category.name || "",
            data_parent_id: category.data_parent_id || "0",
            data_image: category.data_image || "",
            data_desc: category.data_desc || "",
            data_parent_id_v2: category.data_parent_id_v2 || "",
          });
        }
      };

      fetchCategoryDetails();
    } else if (isOpen && mode === "add") {
      setApiData({
        data_type: "",
        data_code: "",
        data_title: "",
        name: "",
        data_parent_id: "0",
        data_image: "",
        data_desc: "",
        data_parent_id_v2: "",
      });
    }
  }, [isOpen, mode, category]);

  const fields: IFormField<IMetaDataApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "Category ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Category ID",
          } as const,
        ]
      : []),
    {
      name: "data_code",
      label: "Data Code",
      type: "text" as const,
      required: true,
      placeholder: "Enter data code",
      disabled: mode === "detail",
    },
    {
      name: "name",
      label: "Category Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter category title",
      disabled: mode === "detail",
    },
    {
      name: "data_image",
      label: "Data Image URL",
      type: "text" as const,
      placeholder: "Enter image URL (optional)",
      disabled: mode === "detail",
    },
    {
      name: "data_desc",
      label: "Data Description",
      type: "textarea" as const,
      placeholder: "Enter description (optional)",
      rows: 4,
      disabled: mode === "detail",
    },
    {
      name: "data_parent_id_v2",
      label: "Data Parent Id V2",
      type: "text" as const,
      placeholder: "Enter description (optional)",
      rows: 4,
      disabled: mode === "detail",
    },
  ];

  return (
    <FormModal<IMetaDataApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        const newCategory: IMetaDataApi = {
          id: data.id || undefined,
          data_type: data.data_type || "",
          data_code: data.data_code,
          data_title: data.name,
          data_parent_id: data.data_parent_id || "0",
          data_image: data.data_image || "",
          data_desc: data.data_desc || "",
          data_parent_id_v2: data.data_parent_id_v2 || "",
        };
        await onSubmit(newCategory);
        onReset && onReset();
      }}
      mode={mode}
      config={apiData}
      fields={fields}
      title={{
        add: "Add New Category",
        edit: "Edit Category",
        detail: "Category Details",
      }}
      description={{
        add: "Create a new Category with the details below.",
        edit: "Update the category details to keep it up-to-date.",
        detail: "View the details of the category below.",
      }}
      children={children}
    />
  );
};
