// components/badge/method-badge.tsx
import React from "react";

export default function MethodBadge({
  method,
}: Readonly<{
  method: "GET" | "POST" | "PUT" | "DELETE" | "DEFAULT";
}>) {
  const colors = {
    GET: "bg-green-100 text-green-800",
    POST: "bg-blue-100 text-blue-800",
    PUT: "bg-yellow-100 text-yellow-800",
    DELETE: "bg-red-100 text-red-800",
    DEFAULT: "bg-gray-200 text-gray-700",
  };

  const colorClass = colors[method] || colors.DEFAULT;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}
    >
      {method}
    </span>
  );
}
