import React, { useEffect, useState, useRef } from "react";
import { FormModal } from "../../../../index";
import { IUserBehaviorLogGetApi } from "../../../../models";
import { searchUserBehaviorLogApi } from "../../../../services";
import { IUserBehaviorLogFormModalProps } from "./index";
import { toast } from "react-toastify";
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

export const UserBehaviorLogFormModal: React.FC<
  IUserBehaviorLogFormModalProps
> = ({ isOpen, onClose, onSubmit, onReset, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<IUserBehaviorLogGetApi>(
    typeof config === "object" && config !== null
      ? {
          id: config.id || "",
          user_name: config.user_name || "",
          action: config.action || "",
          description: config.description || "",
          json_data: processJson(config.json_data) || {},
          created_at: config.created_at || "",
          created_by: config.created_by || "",
        }
      : {
          id: "",
          user_name: "",
          action: "",
          description: "",
          json_data: {},
          created_at: "",
          created_by: "",
        }
  );
  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.id) {
        const fetchBehaviorLogDetails = async () => {
          try {
            const results = await searchUserBehaviorLogApi({
              id: config.id,
            });
            console.log("API results for Behavior Log details:", results);

            if (results && results.data.length > 0) {
              const fetchedConfig = results.data[0];
              const newFormData = {
                id: fetchedConfig.id || config.id || "",
                user_name: fetchedConfig.user_name || config.user_name || "",
                action: fetchedConfig.action || config.action || "",
                description: fetchedConfig.description || config.description || "",
                json_data:
                  processJson(fetchedConfig.json_data) ||
                  processJson(config.json_data) ||
                  {},
                created_at: fetchedConfig.created_at || config.created_at || "",
                created_by: fetchedConfig.created_by || config.created_by || "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                id: config.id || "",
                user_name: config.user_name || "",
                action: config.action || "",
                description: config.description || "",
                json_data: processJson(config.json_data) || {},
                created_at: config.created_at || "",
                created_by: config.created_by || "",
              };
              setFormData(newFormData);
              console.log(
                "formData set to fallback in edit/detail mode:",
                newFormData
              );
              toast.warn("No data returned from API, using provided data.");
            }
          } catch (error) {
            console.error("Error fetching Behavior Log details:", error);
            toast.error("Failed to fetch behavior log details.");
            const newFormData = {
              id: config.id || "",
              user_name: config.user_name || "",
              action: config.action || "",
              description: config.description || "",
              json_data: processJson(config.json_data) || {},
              created_at: config.created_at || "",
              created_by: config.created_by || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchBehaviorLogDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          id: "",
          user_name: "",
          action: "",
          description: "",
          json_data: {"":""},
          created_at: "",
          created_by: "",
        };
        setFormData(defaultFormData);
        console.log("formData initialized in add mode:", defaultFormData);
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, mode, config]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof IUserBehaviorLogGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<IUserBehaviorLogGetApi>[] = [
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
      name: "user_name",
      label: "User Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter user name",
      disabled: mode === "detail",
      value: formData.user_name,
      onChange: (e) => handleInputChange(e, "user_name"),
    } as const,
    {
      name: "action",
      label: "Action",
      type: "text" as const,
      required: true,
      placeholder: "Enter action",
      disabled: mode === "detail",
      value: formData.action,
      onChange: (e) => handleInputChange(e, "action"),
    } as const,
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Enter description",
      disabled: mode === "detail",
      value: formData.description,
      onChange: (e) => handleInputChange(e, "description"),
    } as const,
    {
      name: "created_by",
      label: "Created By",
      type: "text" as const,
      placeholder: "Enter created by",
      disabled: mode === "detail",
      value: formData.created_by,
      onChange: (e) => handleInputChange(e, "created_by"),
    } as const,
    {
      name: "json_data",
      label: "JSON Data",
      type: "aceEditor" as const,
      placeholder: "Enter JSON data {Json Object}",
      disabled: mode === "detail",
      value: JSON.stringify(formData.json_data, null, 2),
      onChange: (e) => handleInputChange(e, "json_data"),
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
  ];

  console.log("Rendering UserBehaviorLogFormModal with formData:", formData);
  console.log("Fields passed to FormModal:", fields);

  return (
    <FormModal<IUserBehaviorLogGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);

          let jsonData = data.json_data || {};
          if (typeof data.json_data === "string" && data.json_data !== "") {
            try {
              jsonData = JSON.parse(data.json_data);
              if (typeof jsonData !== "object" || jsonData === null) {
                toast.error("JSON Data must be a valid JSON object.");
                throw new Error("Invalid JSON Data");
              }
            } catch (error) {
              toast.error("JSON Data must be a valid JSON object.");
              throw new Error("Invalid JSON Data");
            }
          }

          const submitData: IUserBehaviorLogGetApi = {
            id: data.id || "",
            user_name: data.user_name || "",
            action: data.action || "",
            description: data.description || "",
            json_data: jsonData,
            created_at: data.created_at || "",
            created_by: data.created_by || "",
          };

          await onSubmit(submitData);
          onReset && onReset();
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New User Behavior Log",
        edit: "Edit User Behavior Log",
        detail: "User Behavior Log Details",
      }}
      description={{
        add: "Create a new user behavior log with the details below.",
        edit: "Update user behavior log details to keep information current.",
        detail: "View details of the user behavior log below.",
      }}
      children={children}
    />
  );
};