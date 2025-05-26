// components/input-field/date-picker-component.tsx
"use client";
import React, { forwardRef } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { FiCalendar } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  label?: string;
  /** ค่าปัจจุบันเป็น ISO string หรือ empty */
  value: string;
  /** รับค่าเป็น ISO string */
  onChange: (iso: string) => void;
  isLoading?: boolean;
  className?: string;
}

const CustomInput = forwardRef<HTMLInputElement, any>(
  ({ value, onClick }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="w-full flex items-center justify-between px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:shadow-md focus:outline-none"
    >
      <span>{value || "Select date & time"}</span>
      <FiCalendar className="text-xl text-gray-400 dark:text-gray-500" />
    </button>
  )
);
CustomInput.displayName = "CustomInput";

export default function DatePickerComponent({
  label,
  value,
  onChange,
  isLoading = false,
  className = "",
}: DatePickerProps) {
  // แปลงสตริงเป็น Date
  const selectedDate = value ? new Date(value) : null;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {isLoading ? (
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      ) : (
        <ReactDatePicker
          selected={selectedDate}
          onChange={(date) =>
            date instanceof Date && onChange(date.toISOString())
          }
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd/MM/yyyy HH:mm"
          placeholderText="Select date & time"
          customInput={<CustomInput />}
          popperClassName="shadow-lg rounded-lg"
          calendarClassName="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      )}
    </div>
  );
}
