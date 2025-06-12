import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import {
  IPotentialLeadActionGetApi,
  IMartPotentialLeadGetApi,
} from "../../../../models";
import {
  searchPotentialLeadActionApi,
  searchMartPotentialLeadsApi,
} from "../../../../services";
import { potentialLeadActionFormModalProps } from "./index";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { IFormField } from "../../../../components";

const processJson = (data: any): Record<string, any> => {
  try {
    if (typeof data === "string") {
      return JSON.parse(data) || {};
    }
    return data || {};
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return {};
  }
};

export const MartPotentialLeadActionFormModal: React.FC<
  potentialLeadActionFormModalProps
> = ({ isOpen, onClose, onSubmit, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<IPotentialLeadActionGetApi>(
    typeof config === "object" && config !== null
      ? {
          id: config.id || "",
          potential_lead_id: config.potential_lead_id || "",
          json_data: processJson(config.json_data) || {},
          last_name: config.last_name || "",
          list_potential_lead_id: config.list_potential_lead_id || "",
          action_username: config.action_username || "",
          action_username_id: config.action_username_id || "",
          action_type: config.action_type || "",
          create_at: config.create_at || "",
        }
      : {
          id: "",
          create_at: "",
          json_data: {},
          potential_lead_id: "",
          last_name: "",
          list_potential_lead_id: "",
          action_username: "",
          action_username_id: "",
          action_type: "",
        }
  );
  const [potential_lead_idSuggestions, setpotential_lead_idSuggestions] =
    useState<IMartPotentialLeadGetApi[]>([]);
  const [
    showpotential_lead_idSuggestions,
    setShowpotential_lead_idSuggestions,
  ] = useState(false);

  const pontentialIdRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.id) {
        const fetchPotentialLeadActionDetails = async () => {
          try {
            const results = await searchPotentialLeadActionApi({
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
                potential_lead_id:
                  fetchedConfig.potential_lead_id ||
                  config.potential_lead_id ||
                  "",
                id: fetchedConfig.id || config.id || "",
                json_data:
                  processJson(fetchedConfig.json_data) ||
                  processJson(config.json_data) ||
                  {},
                last_name: fetchedConfig.last_name || config.last_name || "",
                list_potential_lead_id:
                  fetchedConfig.list_potential_lead_id ||
                  config.list_potential_lead_id ||
                  "",
                action_username:
                  fetchedConfig.action_username || config.action_username || "",
                action_username_id:
                  fetchedConfig.action_username_id ||
                  config.action_username_id ||
                  "",
                action_type:
                  fetchedConfig.action_type || config.action_type || "",
                create_at: fetchedConfig.create_at || config.create_at || "",
              };
              setFormData(newFormData);
            } else {
              const newFormData = {
                potential_lead_id: config.potential_lead_id || "",
                id: config.id || "",
                last_name: config.last_name || "",
                list_potential_lead_id: config.list_potential_lead_id || "",
                action_username: config.action_username || "",
                action_username_id: config.action_username_id || "",
                action_type: config.action_type || "",
                create_at: config.create_at || "",
                json_data: processJson(config.json_data) || {},
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
              potential_lead_id: config.potential_lead_id || "",
              id: config.id || "",
              create_at: config.create_at || "",
              last_name: config.last_name || "",
              list_potential_lead_id: config.list_potential_lead_id || "",
              action_username: config.action_username || "",
              action_username_id: config.action_username_id || "",
              action_type: config.action_type || "",

              json_data: processJson(config.json_data) || {},
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchPotentialLeadActionDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          potential_lead_id: "",
          last_name: "",
          list_potential_lead_id: "",
          action_username: "",
          action_username_id: "",
          action_type: "",
          user_action: "",
          create_at: "",
          json_data: { "": "" },
        };
        setFormData(defaultFormData);
        setpotential_lead_idSuggestions([]);
        setShowpotential_lead_idSuggestions(false);

        console.log("formData initialized in add mode:", defaultFormData);
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, mode, config]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pontentialIdRef.current &&
        !pontentialIdRef.current.contains(event.target as Node)
      ) {
        setShowpotential_lead_idSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchPontetialIdSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setpotential_lead_idSuggestions([]);
        setShowpotential_lead_idSuggestions(false);
        console.log("Empty email search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchMartPotentialLeadsApi({
          size: 15,
          email: value,
        });
        setpotential_lead_idSuggestions(results.data);
        setShowpotential_lead_idSuggestions(results.data.length > 0);

        if (results.data.length === 0) {
          toast.warn("No Pontential Lead Id found for the given email.");
        }
      } catch (error) {
        setpotential_lead_idSuggestions([]);
        setShowpotential_lead_idSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof IPotentialLeadActionGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<IPotentialLeadActionGetApi>[] = [
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
      name: "potential_lead_id",
      label: "Potential Lead Id",
      type: "text" as const,
      inputType: "text" as const,
      required: true,
      placeholder: "Enter email to search refer Potential Lead Id",
      disabled: mode === "detail",
      value: formData.potential_lead_id,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "potential_lead_id");
        if (e.target instanceof HTMLInputElement) {
          searchPontetialIdSuggestions(e.target.value);
        }
      },
      suggestions:
        showpotential_lead_idSuggestions &&
        potential_lead_idSuggestions.length > 0
          ? potential_lead_idSuggestions.map((pontential) => ({
              value: pontential.potential_lead_id || "",
              label: `${pontential.email} (Pontential Lead ID: ${pontential.potential_lead_id})`,
              onSelect: () => {
                const updatedData = {
                  potential_lead_id: pontential.potential_lead_id || "",
                  email: pontential.email || "",
                };
                setFormData((prev) => ({
                  ...prev,
                  potential_lead_id: updatedData.potential_lead_id,
                  email: updatedData.email,
                }));
                setShowpotential_lead_idSuggestions(false);
                console.log(
                  "Selected pontential lead id suggestion:",
                  updatedData
                );
                return updatedData;
              },
            }))
          : [],
      suggestionRef: pontentialIdRef,
      clearable: mode !== "detail" && !!formData.potential_lead_id,
      onClear: () => {
        setFormData((prev) => ({
          ...prev,
          potential_lead_id: "",
          email: "",
        }));
        return { potential_lead_id: "", email: "" };
      },
    } as const,
    {
      name: "json_data",
      label: "JSON Metadata",
      type: "aceEditor" as const,
      placeholder: "Enter JSON metadata {Json Object}",
      disabled: mode === "detail",
      value: JSON.stringify(formData.json_data, null, 2),
      aceOptions: {
        mode: "json",
        theme: "github",
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        fontSize: 14,
        height: "150px",
      },
    } as const,
    {
      name: "last_name",
      label: "Last Name",
      type: "text" as const,
      inputType: "text" as const,

      placeholder: "Enter last name",
      disabled: mode === "detail",
      value: formData.last_name,
      onChange: (e) => handleInputChange(e, "last_name"),
    } as const,
    {
      name: "list_potential_lead_id",
      label: "List Potential Lead Id",
      type: "text" as const,
      inputType: "text" as const,
      required: true,
      placeholder: "Enter list potential lead id",
      disabled: mode === "detail",
      value: formData.list_potential_lead_id,
      onChange: (e) => handleInputChange(e, "list_potential_lead_id"),
    } as const,
    {
      name: "action_username",
      label: "Action Username",
      type: "text" as const,
      inputType: "text" as const,

      placeholder: "Enter action username",
      disabled: mode === "detail",
      value: formData.action_username,
      onChange: (e) => handleInputChange(e, "action_username"),
    } as const,
    {
      name: "action_username_id",
      label: "Action Username ID",
      type: "text" as const,
      inputType: "text" as const,

      placeholder: "Enter action username ID",
      disabled: mode === "detail",
      value: formData.action_username_id,
      onChange: (e) => handleInputChange(e, "action_username_id"),
    } as const,
    {
      name: "action_type",
      label: "Action Type",
      type: "text" as const,
      inputType: "text" as const,

      placeholder: "Enter action type",
      disabled: mode === "detail",
      value: formData.action_type,
      onChange: (e) => handleInputChange(e, "action_type"),
    } as const,
  ];
  return (
    <FormModal<IPotentialLeadActionGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);

          let jsonMetadata = data.json_data || {};
          if (typeof data.json_data === "string" && data.json_data !== "") {
            try {
              jsonMetadata = JSON.parse(data.json_data);
              if (typeof jsonMetadata !== "object" || jsonMetadata === null) {
                toast.error("JSON Metadata must be a valid JSON object.");
                throw new Error("Invalid JSON Metadata");
              }
            } catch (error) {
              toast.error("JSON Metadata must be a valid JSON object.");
              throw new Error("Invalid JSON Metadata");
            }
          }

          const submitData: IPotentialLeadActionGetApi = {
            potential_lead_id: String(data.potential_lead_id || ""),
            id: data.id || undefined,
            create_at: data.create_at || "",
            last_name: data.last_name || "",
            list_potential_lead_id: data.list_potential_lead_id || "",
            action_username: data.action_username || "",
            action_username_id: data.action_username_id || "",
            action_type: data.action_type || "",
            json_data: jsonMetadata,

          };
          console.log("Payload gửi lên API:", submitData);

          await onSubmit(submitData);
          console.log(
            await searchPotentialLeadActionApi({
              size: 1,
              potential_lead_id: submitData.potential_lead_id,
            })
          );
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Potential Lead Action ",
        edit: "Edit Potential Lead Action",
        detail: "Potential Lead Details Action",
      }}
      description={{
        add: "Create a new Potential Lead Action with the details below.",
        edit: "Update Potential Lead Action details to keep information current.",
        detail: "View details of the Potential Lead Action below.",
      }}
      children={children}
    />
  );
};
