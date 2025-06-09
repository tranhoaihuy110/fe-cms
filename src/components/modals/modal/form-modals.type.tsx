import React from "react";
export interface IFormField<T> {
  name: keyof T;
  label: string;
  type:
    | "text"
    | "textarea"
    | "aceEditor"
    | "urlList"
    | "custom"
    | "array"
    | "select"
    | "datetime";
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  aceOptions?: {
    mode?: string;
    theme?: string;
    fontSize?: number;
    showLineNumbers?: boolean;
    tabSize?: number;
    enableBasicAutocompletion?: boolean;
    enableLiveAutocompletion?: boolean;
    enableSnippets?: boolean;
    height?: string;
  };
  datePickerOptions?: {
    showTimeSelect?: boolean;
    timeFormat?: string;
    timeIntervals?: number;
    dateFormat?: string;
    minDate?: Date;
    maxDate?: Date;
  };
  selectOptions?: {
    options: { value: string | number; label: string }[];
    multiple?: boolean;
  };
  defaultValue?: any;
  inputType?: "text" | "number" | "email" | "tel";
  value?: string | { url: string; zoom: number }[] | Date | null;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >
  ) => void;
  onChangeDate?: (date: Date | null) => void;
  onChangeSelect?: (s :React.ChangeEvent<HTMLSelectElement>) => void;
  suggestions?: { value: any; label: string; onSelect: () => Partial<T> }[];
  suggestionRef?: React.RefObject<HTMLDivElement | null>;
  clearable?: boolean;
  onClear?: () => Partial<T>;
  renderValue?: () => React.JSX.Element;
}

export interface IFormModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: T;
  fields: IFormField<T>[];
  title: {
    add: string;
    edit: string;
    detail: string;
  };
  description: {
    add: string;
    edit: string;
    detail: string;
  };
  children?: React.ReactNode;
  className?: string;
}
