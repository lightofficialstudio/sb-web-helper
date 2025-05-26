"use client";
import React from "react";
import { FiCalendar } from "react-icons/fi";
import { InputFieldComponent } from "./input-field-component";

interface DatePickerProps {
  /** ป้ายชื่อฟิลด์ */
  label?: string;
  /** ค่าปัจจุบันในฟอร์แมต YYYY-MM-DD */
  value: string;
  /** ฟังก์ชันรับค่าใหม่ */
  onChange: (val: string) => void;
  /** ถ้ากำลังโหลด ให้แสดง skeleton */
  isLoading?: boolean;
  /** คลาสเพิ่มเติม */
  className?: string;
}

export default function DatePickerComponent({
  label,
  value,
  onChange,
  isLoading = false,
  className = "",
}: DatePickerProps) {
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
        <InputFieldComponent
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          // icon={<FiCalendar className="text-gray-400 dark:text-gray-500" />}
          placeholder="เลือกวันที่"
          className="shadow-sm hover:shadow-md transition-shadow duration-200"
        />
      )}
    </div>
  );
}
