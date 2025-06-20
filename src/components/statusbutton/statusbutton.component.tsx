import React from "react";
import { StatusButtonProps } from "./index";

export const StatusButton: React.FC<StatusButtonProps> = ({
  statuses,
  className,
  customStyles,
}) => {
  const getDefaultStatusStyle = (status: string) => {
    const lowerStatus = status.toLowerCase();
    switch (lowerStatus) {
      case "active":
        return "bg-green-500 text-white";
      case "inactive":
        return "bg-gray-500 text-white";
      case "pending":
        return "bg-yellow-500 text-black";
      case "completed":
        return "bg-blue-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <>
      {statuses.map((status, index) => {
        const style =
          customStyles?.[status.toLowerCase()] || getDefaultStatusStyle(status);
        return (
          <button
            key={index}
            className={`px-3 py-1 rounded-full text-xs font-semibold focus:outline-none ${style} ${className}`}
            disabled
          >
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </button>
        );
      })}
    </>
  );
};
