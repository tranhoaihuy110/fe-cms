export interface ISuggestion<T> {
  value: string;
  label: string;
  data: T;
}

export interface ISuggestionsFieldProps<T> {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  searchApi: (params: any) => Promise<{ data: T[] }>;
  searchParams: (searchValue: string) => any;
  getLabel: (item: T) => string;
  getValue: (item: T) => string;
  onChange: (value: string) => void;
  onSelectSuggestion?: (selectedItem: T) => void;
  className?: string;
  debounceDelay?: number;
}
