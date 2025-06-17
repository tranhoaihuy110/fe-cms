import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import {
  IPropertyRoomGetApi,
  IPropertiesGetApi,
  IPropertyFloorsGetApi,
} from "../../../../models";
import {
  searchPropertyRoomApi,
  searchPropertiesApi,
  searchPropertyFloorsApi,
} from "../../../../services";
import { IPropertyRoomFormModalProps } from "./index";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { IFormField } from "../../../../components";

export const PropertyRoomFormModal: React.FC<IPropertyRoomFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<IPropertyRoomGetApi>(
    typeof config === "object" && config !== null
      ? {
          id: config.id || "",
          property_id: config.property_id || "",
          floor_id: config.floor_id || "",
          room_type: config.room_type || "",
          room_name: config.room_name || "",
          status: config.status || "",
          created_at: config.created_at || "",
        }
      : {
          id: "",
          property_id: "",
          floor_id: "",
          room_type: "",
          room_name: "",
          status: "",
          created_at: "",
        }
  );
  const [referpartneridSuggestions, setReferpartneridSuggestions] = useState<
    IPropertiesGetApi[]
  >([]);
  const [floorIdSuggestions, setFloorIdSuggestions] = useState<
    IPropertyFloorsGetApi[]
  >([]);
  const [showReferPartnerIdSuggestions, setShowReferPartnerIdSuggestions] =
    useState(false);
  const [showFloorIdSuggestions, setShowFloorIdSuggestions] = useState(false);

  const referPartnerIdRef = useRef<HTMLDivElement | null>(null);
  const floorIdRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.id) {
        const fetchPropertyRoomDetails = async () => {
          try {
            const results = await searchPropertyRoomApi({
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
                floor_id: fetchedConfig.floor_id || config.floor_id || "",
                room_type: fetchedConfig.room_type || config.room_type || "",
                room_name: fetchedConfig.room_name || config.room_name || "",
                status: fetchedConfig.status || config.status || "",
                created_at: fetchedConfig.created_at || config.created_at || "",
              };
              setFormData(newFormData);
            } else {
              const newFormData = {
                id: config.id || "",
                property_id: config.property_id || "",
                floor_id: config.floor_id || "",
                room_type: config.room_type || "",
                room_name: config.room_name || "",
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
              floor_id: config.floor_id || "",
              room_type: config.room_type || "",
              room_name: config.room_name || "",
              status: config.status || "",
              created_at: config.created_at || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchPropertyRoomDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          id: "",
          property_id: "",
          floor_id: "",
          room_type: "",
          room_name: "",
          status: "",
          created_at: "",
        };
        setFormData(defaultFormData);
        setReferpartneridSuggestions([]);
        setFloorIdSuggestions([]);
        setShowReferPartnerIdSuggestions(false);
        setShowFloorIdSuggestions(false);

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
        floorIdRef.current &&
        !floorIdRef.current.contains(event.target as Node)
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

  const searchFloorIdSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setFloorIdSuggestions([]);
        setShowFloorIdSuggestions(false);
        return;
      }
      try {
        const results = await searchPropertyFloorsApi({
          size: 15,
          floor_name: value,
        });
        setFloorIdSuggestions(results.data);
        setShowFloorIdSuggestions(results.data.length > 0);
        if (results.data.length === 0) {
          toast.warn("No floor id found for the given name.");
        }
      } catch (error) {
        setFloorIdSuggestions([]);
        setShowFloorIdSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof IPropertyRoomGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<IPropertyRoomGetApi>[] = [
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
      name: "floor_id",
      label: "Floor ID",
      type: "text" as const,
      inputType: "text" as const,
      required: true,
      placeholder: "Enter Floor Name",
      disabled: mode === "detail",
      value: formData.floor_id,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "floor_id");
        if (e.target instanceof HTMLInputElement) {
          searchFloorIdSuggestions(e.target.value);
        }
      },
      suggestions:
        showFloorIdSuggestions && floorIdSuggestions.length > 0
          ? floorIdSuggestions.map((property) => ({
              value: property.id || "",
              label: `${property.floor_name || property.id} (ID: ${
                property.id
              })`,
              onSelect: () => {
                const updatedData = {
                  floor_id: property.id || "",
                };
                setFormData((prev) => ({
                  ...prev,
                  floor_id: updatedData.floor_id,
                }));
                setShowFloorIdSuggestions(false);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: floorIdRef,
      clearable: mode !== "detail" && !!formData.floor_id,
      onClear: () => {
        setFormData((prev) => ({
          ...prev,
          floor_id: "",
        }));
        return { floor_id: "" };
      },
    } as const,
    {
      name: "room_type",
      label: "Room Type",
      type: "text" as const,
      required: true,
      placeholder: "Enter room type",
      disabled: mode === "detail",
      value: formData.room_type,
      onChange: (e) => handleInputChange(e, "room_type"),
    } as const,
    {
      name: "room_name",
      label: "Room Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter room name",
      disabled: mode === "detail",
      value: formData.room_name,
      onChange: (e) => handleInputChange(e, "room_name"),
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

  return (
    <FormModal<IPropertyRoomGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);

          const submitData: IPropertyRoomGetApi = {
            id: data.id || "",
            property_id: data.property_id || "",
            floor_id: data.floor_id || "",
            room_type: data.room_type || "",
            room_name: data.room_name || "",
            status: data.status || "",
            created_at: data.created_at || "",
          };

          await onSubmit(submitData);
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Property Room",
        edit: "Edit Property Room",
        detail: "Property Room Details",
      }}
      description={{
        add: "Create a new property room with the details below.",
        edit: "Update property room details to keep information current.",
        detail: "View details of the property room below.",
      }}
      children={children}
    />
  );
};
