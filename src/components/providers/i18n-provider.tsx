// components/providers/locale-provider.tsx
"use client";

import { useEffect } from "react";

export default function LocaleProvider({ locale }: { locale: string }) {
    useEffect(() => {
        if (locale) {
            localStorage.setItem("appLocale", locale);
        }
    }, [locale]);

    return null;
}
