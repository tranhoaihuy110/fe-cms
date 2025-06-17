import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import { IPropertyFloorsGetApi, IPropertiesGetApi } from "../../../../models";
import {
  searchPropertyFloorsApi,
  searchPropertiesApi,
} from "../../../../services";
import { IPropertyFloorsFormModalProps } from "./index";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { IFormField } from "../../../../components";

export const PropertyFloorsFormModal: React.FC<
  IPropertyFloorsFormModalProps
> = ({ isOpen, onClose, onSubmit, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<IPropertyFloorsGetApi>(
    typeof config === "object" && config !== null
      ? {
          id: config.id || "",
          property_id: config.property_id || "",
          floor_type: config.floor_type || "",
          floor_name: config.floor_name || "",
          status: config.status || "",
          created_at: config.created_at || "",
        }
      : {
          id: "",
          property_id: "",
          floor_type: "",
          floor_name: "",
          status: "",
          created_at: "",
        }
  );
  const [referpartneridSuggestions, setReferpartneridSuggestions] = useState<
    IPropertiesGetApi[]
  >([]);
  const [leadIdSuggestions, setLeadIdSuggestions] = useState<
    IPropertiesGetApi[]
  >([]);
  const [showReferPartnerIdSuggestions, setShowReferPartnerIdSuggestions] =
    useState(false);

  const referPartnerIdRef = useRef<HTMLDivElement | null>(null);
  const leadIdRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.id) {
        const fetchPropertyFloorsDetails = async () => {
          try {
            const results = await searchPropertyFloorsApi({
              size: 1,
              id: config.id,
            });
            console.log(
              "API results for leads refer partner details:",
              results
            );

            if (results && results.data.length > 0) {
              const fetchedConfig = results.data[0];
              const newFormData = {
                id: fetchedConfig.id || config.id || "",
                property_id:
                  fetchedConfig.property_id || config.property_id || "",
                floor_type: fetchedConfig.floor_type || config.floor_type || "",
                floor_name: fetchedConfig.floor_name || config.floor_name || "",
                status: fetchedConfig.status || config.status || "",
                created_at: fetchedConfig.created_at || config.created_at || "",
              };
              setFormData(newFormData);
            } else {
              const newFormData = {
                id: config.id || "",
                property_id: config.property_id || "",
                floor_type: config.floor_type || "",
                floor_name: config.floor_name || "",
                status: config.status || "",
                created_at: config.created_at || "",
              };
              setFormData(newFormData);
              console.log(
                "formData set to fallback in edit/detail mode:",
                newFormData
              );
              toast.warn("No data returned from API, using provided data.");
            }
          } catch (error) {
            const newFormData = {
              id: config.id || "",
              property_id: config.property_id || "",
              floor_type: config.floor_type || "",
              floor_name: config.floor_name || "",
              status: config.status || "",
              created_at: config.created_at || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchPropertyFloorsDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          id: "",
          property_id: "",
          floor_type: "",
          floor_name: "",
          status: "",
          created_at: "",
        };
        setFormData(defaultFormData);
        setReferpartneridSuggestions([]);
        setLeadIdSuggestions([]);
        setShowReferPartnerIdSuggestions(false);

        console.log("formData initialized in add mode:", defaultFormData);
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, mode, config]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        referPartnerIdRef.current &&
        !referPartnerIdRef.current.contains(event.target as Node)
      ) {
        setShowReferPartnerIdSuggestions(false);
      }
      if (
        leadIdRef.current &&
        !leadIdRef.current.contains(event.target as Node)
      ) {
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchPropertyIdSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setReferpartneridSuggestions([]);
        setShowReferPartnerIdSuggestions(false);
        return;
      }
      try {
        const results = await searchPropertiesApi({
          size: 15,
          property_name: value,
        });
        setReferpartneridSuggestions(results.data);
        setShowReferPartnerIdSuggestions(results.data.length > 0);
        if (results.data.length === 0) {
          toast.warn("No refer partners found for the given name.");
        }
      } catch (error) {
        setReferpartneridSuggestions([]);
        setShowReferPartnerIdSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof IPropertyFloorsGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<IPropertyFloorsGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "ID",
            type: "text" as const,
            disabled: true,
            placeholder: "ID",
            value: formData.id,
          } as const,
        ]
      : []),
    {
      name: "property_id",
      label: "Property ID",
      type: "text" as const,
      inputType: "text" as const,
      required: true,
      placeholder: "Enter Property Name",
      disabled: mode === "detail",
      value: formData.property_id,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "property_id");
        if (e.target instanceof HTMLInputElement) {
          searchPropertyIdSuggestions(e.target.value);
        }
      },
      suggestions:
        showReferPartnerIdSuggestions && referpartneridSuggestions.length > 0
          ? referpartneridSuggestions.map((property) => ({
              value: property.property_id || "",
              label: `${property.property_name || property.property_id} (ID: ${
                property.property_id
              })`,
              onSelect: () => {
                const updatedData = {
                  property_id: property.property_id || "",
                };
                setFormData((prev) => ({
                  ...prev,
                  property_id: updatedData.property_id,
                }));
                setShowReferPartnerIdSuggestions(false);
                console.log("Selected property suggestion:", updatedData);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: referPartnerIdRef,
      clearable: mode !== "detail" && !!formData.property_id,
      onClear: () => {
        setFormData((prev) => ({
          ...prev,
          property_id: "",
        }));
        return { property_id: "" };
      },
    } as const,
    {
      name: "floor_type",
      label: "Floor Type",
      type: "text" as const,
      required: true,
      placeholder: "Enter floor type",
      disabled: mode === "detail",
      value: formData.floor_type,
      onChange: (e) => handleInputChange(e, "floor_type"),
    } as const,
    {
      name: "floor_name",
      label: "Floor Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter floor name",
      disabled: mode === "detail",
      value: formData.floor_name,
      onChange: (e) => handleInputChange(e, "floor_name"),
    } as const,
    {
      name: "status",
      label: "Status",
      type: "text" as const,
      required: true,
      placeholder: "Enter status",
      disabled: mode === "detail",
      value: formData.status,
      onChange: (e) => handleInputChange(e, "status"),
    } as const,
  ];

  console.log(
    "Rendering Leads Refer Partner Form Modal with formData:",
    formData
  );
  console.log("Fields passed to FormModal:", fields);
  console.log(
    "Current refer_partner_id suggestions:",
    referpartneridSuggestions
  );
  console.log("Current lead ID suggestions:", leadIdSuggestions);

  return (
    <FormModal<IPropertyFloorsGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);

          const submitData: IPropertyFloorsGetApi = {
            id: data.id || "",
            property_id: data.property_id || "",
            floor_type: data.floor_type || "",
            floor_name: data.floor_name || "",
            status: data.status || "",
            created_at: data.created_at || "",
          };
          console.log("Payload gửi lên API:", submitData);

          await onSubmit(submitData);
          console.log(
            "Phản hồi từ API sau khi lưu:",
            await searchPropertyFloorsApi({
              size: 1,
              id: submitData.id,
            })
          );
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Leads Refer Partner Activity",
        edit: "Edit Leads Refer Partner Activity",
        detail: "Leads Refer Partner Activity Details",
      }}
      description={{
        add: "Create a new Leads Refer Partner Activity with the details below.",
        edit: "Update Leads Refer Partner Activity details to keep information current.",
        detail: "View details of the Leads Refer Partner Activity below.",
      }}
      children={children}
    />
  );
};
