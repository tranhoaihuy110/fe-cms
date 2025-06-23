import { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash/debounce";
import { ISuggestion, ISuggestionsFieldProps } from "./index";

export const SuggestionsField = <T,>({
  name,
  label,
  placeholder,
  value,
  disabled,
  searchApi,
  searchParams,
  getLabel,
  getValue,
  onChange,
  onSelectSuggestion,
  className,
  debounceDelay = 500,
}: ISuggestionsFieldProps<T>) => {
  const [suggestions, setSuggestions] = useState<ISuggestion<T>[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement | null>(null);

  const searchItems = useCallback(
    debounce(async (searchValue: string) => {
      if (!searchValue.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        console.log("Empty search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchApi(searchParams(searchValue));
        const formattedResults = results.data.map((item: T) => ({
          value: getValue(item),
          label: getLabel(item),
          data: item,
        }));
        setSuggestions(formattedResults);
        setShowSuggestions(formattedResults.length > 0);
        console.log(`Search results:`, formattedResults);
        if (formattedResults.length === 0) {
          console.warn(`No results found for search: ${searchValue}`);
        }
      } catch (error) {
        console.error(`Error searching items:`, error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, debounceDelay),
    [searchApi, searchParams, getLabel, getValue, debounceDelay]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className || ""}`} ref={suggestionRef}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          searchItems(e.target.value);
        }}
        disabled={disabled}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800 dark:ring-gray-600">
          {suggestions.slice(0, 15).map((suggestion) => (
            <li
              key={suggestion.value}
              className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white dark:text-gray-200 dark:hover:bg-indigo-500"
              onClick={() => {
                setShowSuggestions(false);
                onSelectSuggestion?.(suggestion.data);
                onChange("");
              }}
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
