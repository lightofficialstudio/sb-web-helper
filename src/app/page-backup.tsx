"use client";
import { useSelector } from "react-redux";
import { RootState } from "@stores/store";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@components/language-switcher";

export default function Page() {
  const { t } = useTranslation("mock");
  const state = useSelector((state: RootState) => state.mockReducer);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        {/* Language Switcher */}
        <LanguageSwitcher />

          <div className="flex flex-col items-center justify-center mt-5">
              <p className="text-sm text-gray-600"> {t("welcome")}</p>
          </div>


      </div>
    </div>
  );
}
