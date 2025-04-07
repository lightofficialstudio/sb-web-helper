"use client";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { useEffect } from "react";

export default function I18nProvider({ children }: { children: React.ReactNode }) {
    // สมมุติว่าคุณมีค่า locale จาก cookie หรือ context
    const locale = typeof window !== "undefined" ? localStorage.getItem("locale") || "en" : "en";

    useEffect(() => {
        i18n.changeLanguage(locale);
    }, [locale]);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
