import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import { ILeadActivityGetApi, ILeadsGetApi } from "../../../../models";
import { searchLeadActivityApi, searchLeadsApi } from "../../../../services";
import { ILeadActivityFormModalProps } from "./index";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { IFormField } from "../../../../components";

export const LeadActivityFormModal: React.FC<ILeadActivityFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<ILeadActivityGetApi>(
    typeof config === "object" && config !== null
      ? {
          activity_id: config.activity_id || "",
          lead_id: config.lead_id || 0,
          email: config.email || "",
          activity_date: config.activity_date || "",
          activity_type: config.activity_type || "",
          description: config.description || "",
          status: config.status || "",
        }
      : {
          activity_id: "",
          lead_id: 0,
          activity_date: "",
          activity_type: "",
          description: "",
          status: "",
          email: "",
        }
  );
  const [emailSuggestions, setEmailSuggestions] = useState<ILeadsGetApi[]>([]);
  const [leadIdSuggestions, setLeadIdSuggestions] = useState<ILeadsGetApi[]>(
    []
  );
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [showLeadIdSuggestions, setShowLeadIdSuggestions] = useState(false);
  const emailRef = useRef<HTMLDivElement | null>(null);
  const leadIdRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.activity_id) {
        const fetchLeadPropertyDetails = async () => {
          try {
            const results = await searchLeadActivityApi({
              size: 1,
              activity_id: config.activity_id,
            });
            console.log("API results for lead activity details:", results);

            if (results && results.length > 0) {
              const fetchedConfig = results[0];
              const newFormData = {
                activity_id:
                  fetchedConfig.activity_id || config.activity_id || "",
                lead_id: fetchedConfig.lead_id || config.lead_id || 0,
                email: fetchedConfig.email || config.email || "",
                activity_date:
                  fetchedConfig.activity_date || config.activity_date || "",
                activity_type:
                  fetchedConfig.activity_type || config.activity_type || "",
                description:
                  fetchedConfig.description || config.description || "",
                status: fetchedConfig.status || config.status || "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                activity_id: config.activity_id || "",
                lead_id: config.lead_id || 0,
                email: config.email || "",
                activity_date: config.activity_date || "",
                activity_type: config.activity_type || "",
                description: config.description || "",
                status: config.status || "",
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
              activity_id: config.activity_id || "",
              lead_id: config.lead_id || 0,
              email: config.email || "",
              activity_date: config.activity_date || "",
              activity_type: config.activity_type || "",
              description: config.description || "",
              status: config.status || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchLeadPropertyDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          lead_id: 0,
          activity_date: "",
          activity_type: "",
          description: "",
          status: "",
        };
        setFormData(defaultFormData);
        setEmailSuggestions([]);
        setLeadIdSuggestions([]);
        setShowEmailSuggestions(false);
        setShowLeadIdSuggestions(false);
        console.log("formData initialized in add mode:", defaultFormData);
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, mode, config]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emailRef.current &&
        !emailRef.current.contains(event.target as Node)
      ) {
        setShowEmailSuggestions(false);
      }
      if (
        leadIdRef.current &&
        !leadIdRef.current.contains(event.target as Node)
      ) {
        setShowLeadIdSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchEmailSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setEmailSuggestions([]);
        setShowEmailSuggestions(false);
        console.log("Empty email search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchLeadsApi({
          page: 1,
          size: 15,
          email: value,
        });
        setEmailSuggestions(results);
        setShowEmailSuggestions(results.length > 0);
        console.log("Search results for email:", results);
        if (results.length === 0) {
          toast.warn("No leads found for the given email.");
        }
      } catch (error) {
        console.error("Error searching leads by email:", error);
        toast.error("Failed to search leads by email.");
        setEmailSuggestions([]);
        setShowEmailSuggestions(false);
      }
    }, 500),
    []
  );

  const searchLeadIdSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setLeadIdSuggestions([]);
        setShowLeadIdSuggestions(false);
        console.log("Empty lead ID search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchLeadsApi({
          page: 1,
          size: 15,
          lead_id: value,
        });
        setLeadIdSuggestions(results);
        setShowLeadIdSuggestions(results.length > 0);
        console.log("Search results for lead ID:", results);
        if (results.length === 0) {
          toast.warn("No leads found for the given lead ID.");
        }
      } catch (error) {
        console.error("Error searching leads by lead ID:", error);
        toast.error("Failed to search leads by lead ID.");
        setLeadIdSuggestions([]);
        setShowLeadIdSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof ILeadActivityGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<ILeadActivityGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "activity_id",
            label: "Activity ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Activity ID",
            value: formData.activity_id,
          } as const,
        ]
      : []),
    ...(mode === "detail"
      ? [
          {
            name: "activity_date",
            label: "Activity Date",
            type: "datetime" as const,
            
            placeholder: "Enter Activity Date",
            disabled: mode === "detail",
            value: formData.activity_date,
          } as const,
        ]
      : []),
    {
      name: "email",
      label: "Email",
      type: "text" as const,
      inputType: "email" as const,
      required: true,
      placeholder: "Enter email",
      disabled: mode === "detail",
      value: formData.email,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "email");
        if (e.target instanceof HTMLInputElement) {
          searchEmailSuggestions(e.target.value);
        }
      },
      suggestions:
        showEmailSuggestions && emailSuggestions.length > 0
          ? emailSuggestions.map((lead) => ({
              value: lead.email || "",
              label: `${lead.email} (Lead ID: ${lead.lead_id})`,
              onSelect: () => {
                const updatedData = {
                  email: lead.email || "",
                  lead_id: lead.lead_id ? Number(lead.lead_id) : 0,
                };
                setFormData((prev) => ({
                  ...prev,
                  email: updatedData.email,
                  lead_id: updatedData.lead_id,
                }));
                setShowEmailSuggestions(false);
                console.log("Selected email suggestion:", updatedData);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: emailRef,
      clearable: mode !== "detail" && !!formData.email,
      onClear: () => {
        setFormData((prev) => ({
          ...prev,
          email: "",
          lead_id: 0,
        }));
        return { email: "", lead_id: 0 };
      },
    } as const,
    {
      name: "lead_id",
      label: "Lead ID",
      type: "text" as const,
      inputType: "number" as const,
      required: true,
      placeholder: "Enter Lead ID",
      disabled: mode === "detail",
      value: formData.lead_id.toString(),
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "lead_id");
        if (e.target instanceof HTMLInputElement) {
          searchLeadIdSuggestions(e.target.value);
        }
      },
      suggestions:
        showLeadIdSuggestions && leadIdSuggestions.length > 0
          ? leadIdSuggestions.map((lead) => ({
              value: lead.lead_id,
              label: `Lead ID: ${lead.lead_id} (Email: ${lead.email})`,
              onSelect: () => {
                const updatedData = {
                  email: lead.email || "",
                  lead_id: lead.lead_id ? Number(lead.lead_id) : 0,
                };
                setFormData((prev) => ({
                  ...prev,
                  email: updatedData.email,
                  lead_id: updatedData.lead_id,
                }));
                setShowLeadIdSuggestions(false);
                console.log("Selected lead ID suggestion:", updatedData);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: leadIdRef,
    } as const,
    {
      name: "activity_type",
      label: "Activity Type",
      type: "text" as const,
      required: true,
      placeholder: "Enter Activity Type",
      disabled: mode === "detail",
      value: formData.activity_type,
    } as const,

    {
      name: "description",
      label: "Description",
      type: "text" as const,
      placeholder: "Enter Description",
      disabled: mode === "detail",
      value: formData.description,
    } as const,
    {
      name: "status",
      label: "Description",
      type: "select" as const,
      placeholder: "Select Status",
      selectOptions: {
        options: [
          { value: "UNCOMPLETED", label: "UNCOMPLETED" },
          { value: "COMPLETED", label: "COMPLETED" },
        ],
      },
      disabled: mode === "detail",
      value: formData.status,
    } as const,
  ];

  return (
    <FormModal<ILeadActivityGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);

          const email = data.email || "";
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            toast.error("Email must be a valid email address.");
            throw new Error("Invalid email");
          }

          const leadId = Number(data.lead_id) || 0;
          if (!leadId) {
            toast.error("Lead ID must be a valid number greater than 0.");
            throw new Error("Invalid lead ID");
          }

          const submitData: ILeadActivityGetApi = {
            activity_id: data.activity_id || undefined,
            lead_id: leadId,
            email: data.email || undefined,
            activity_date: data.activity_date || undefined,
            activity_type: data.activity_type || "",
            description: data.description || "",
            status: data.status || "",
          };

          await onSubmit(submitData);
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Lead Activity",
        edit: "Edit Lead Activity",
        detail: "Lead Activity Details",
      }}
      description={{
        add: "Create a new Lead Activity with the details below.",
        edit: "Update Lead Activity details to keep information current.",
        detail: "View details of the Lead Activity below.",
      }}
      children={children}
    />
  );
};
