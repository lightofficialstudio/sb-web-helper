"use client";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function BaseLoadingComponent({
  title = "⏳ กำลังดาวน์โหลดข้อมูล...",
  message = "กรุณารอสักครู่ ข้อมูลอาจใช้เวลาสักครู่ในการโหลด",
}: Readonly<{
  title?: string;
  message?: string;
}>) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white px-6 py-6 rounded-2xl shadow-xl text-center animate-bounce-in">
        <div className="flex justify-center mb-4">
          <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-4xl" />
        </div>
        <div className="text-lg font-semibold text-gray-700">{title}</div>
        <div className="text-sm text-gray-500 mt-2">{message}</div>
      </div>
    </div>
  );
}
