import React from "react";

interface StatusBadgeProps {
    status: string | number | undefined | null;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    if (status === undefined || status === null) {
        return (
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500">
                Unknown
            </span>
        );
    }

    const statusString = status.toString();

    const statusMap: Record<string, { label: string; color: string; emoji: string }> = {
        "200": { label: "OK", color: "bg-green-100 text-green-800", emoji: "✅" },
        "201": { label: "Created", color: "bg-green-100 text-green-800", emoji: "🆕" },
        "204": { label: "No Content", color: "bg-green-100 text-green-800", emoji: "📭" },
        "400": { label: "Bad Request", color: "bg-yellow-100 text-yellow-800", emoji: "⚠️" },
        "401": { label: "Unauthorized", color: "bg-yellow-100 text-yellow-800", emoji: "🔒" },
        "403": { label: "Forbidden", color: "bg-yellow-100 text-yellow-800", emoji: "⛔️" },
        "404": { label: "Not Found", color: "bg-yellow-100 text-yellow-800", emoji: "🔍" },
        "418": { label: "Blocking by WAF", color: "bg-red-100 text-red-800", emoji: "💥" },
        "500": { label: "Internal Server Error", color: "bg-red-100 text-red-800", emoji: "💥" },
        "502": { label: "Bad Gateway", color: "bg-red-100 text-red-800", emoji: "🚧" },
        "503": { label: "Service Unavailable", color: "bg-red-100 text-red-800", emoji: "🛑" },
    };

    const defaultGroup = {
        "2": { color: "bg-green-100 text-green-800", emoji: "✅" },
        "4": { color: "bg-yellow-100 text-yellow-800", emoji: "⚠️" },
        "5": { color: "bg-red-100 text-red-800", emoji: "❌" },
    };

    const statusInfo = statusMap[statusString] || {
        label: statusString,
        color: defaultGroup[statusString[0]]?.color || "bg-gray-100 text-gray-600",
        emoji: defaultGroup[statusString[0]]?.emoji || "",
    };

    return (
        <span className={`px-3 py-1 rounded-md text-xs font-medium inline-flex items-center gap-1 ${statusInfo.color}`}>
            {statusString} <span className="hidden sm:inline">({statusInfo.label})</span> {statusInfo.emoji}
        </span>
    );
}
