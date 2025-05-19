"use client";
import React, { useEffect, useState } from "react";

export default function MinimalModal({
                                         title,
                                         onClose,
                                         children,
                                     }: {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}) {
    const [visible, setVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(true); // ควบคุม unmount

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10); // trigger เปิด
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setVisible(false); // ค่อยๆ หายไปก่อน
        setTimeout(() => {
            setShouldRender(false);
            onClose(); // แล้วค่อยปิดจริง
        }, 300); // ระยะเวลาเดียวกับ duration-300
    };

    if (!shouldRender) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    visible ? "opacity-40" : "opacity-0"
                }`}
                onClick={handleClose}
            />

            {/* Modal content */}
            <div
                className={`
                    relative bg-white w-full max-w-4xl rounded-xl shadow-xl p-6 transition-all duration-300
                    transform ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
                `}
            >
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-4 text-gray-400 hover:text-black text-2xl"
                >
                    &times;
                </button>
                <div className="max-h-[75vh] overflow-y-auto space-y-4">{children}</div>
            </div>
        </div>
    );
}
