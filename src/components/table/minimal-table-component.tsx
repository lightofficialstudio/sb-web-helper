"use client";

import React, {
  useEffect,
  useState,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

interface MinimalTableProps {
  data?: Record<string, any>[];
  header: string[];
  rowsPerPage?: number;
  onRowsPerPageChange?: (value: number) => void;
  children: React.ReactNode;
  isLoading: boolean;
}

export default function MinimalTable({
  data = [],
  header,
  children,
  rowsPerPage: rowsPerPageProp,
  onRowsPerPageChange,
  isLoading,
}: MinimalTableProps) {
  const [sortedData, setSortedData] = useState<Record<string, any>[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<string>(header[0]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProp ?? 10);

  useEffect(() => {
    setSortedData(data);
    setSortOrder("asc");
    setSortField(header[0]);
    setCurrentPage(1);
  }, [data]);

  const handleSort = (field: string) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...data].sort((a, b) => {
      const aValue = a[field]?.toString() ?? "";
      const bValue = b[field]?.toString() ?? "";
      return order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
    setSortOrder(order);
    setSortField(field);
    setSortedData(sorted);
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-6 overflow-x-auto">
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            {header.map((key) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="cursor-pointer border-b p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="capitalize">{key}</span>
                  {sortField === key ? (
                    sortOrder === "asc" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )
                  ) : (
                    <FiChevronDown className="opacity-30" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: rowsPerPage }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="animate-pulse">
                  {header.map((_, j) => (
                    <td key={j} className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))
            : (() => {
                // Convert children to array and only render as many rows as we have data for
                const childArray = Children.toArray(children).filter((c) =>
                  isValidElement(c)
                ) as React.ReactElement[];
                return childArray
                  .slice(0, paginatedData.length)
                  .map((child, idx) =>
                    cloneElement(child, {
                      row: paginatedData[idx],
                      index: (currentPage - 1) * rowsPerPage + idx + 1,
                    })
                  );
              })()}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div className="flex gap-2 items-center">
          <button
            className="px-3 py-1 border rounded disabled:opacity-40"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-40"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label>Rows per page:</label>
          <select
            className="border rounded px-2 py-1"
            value={rowsPerPage}
            onChange={(e) => {
              const value = Number(e.target.value);
              setRowsPerPage(value);
              setCurrentPage(1);
              onRowsPerPageChange?.(value);
            }}
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
