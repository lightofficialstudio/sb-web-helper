"use client";

import { useState } from "react";
import AuthLayout from "@/components/layouts/auth-layout";
import AuthTabs from "@/components/auth/auth-tabs";
import SignUpPanel from "@/components/auth/sign-up-panel";
import SignInPanel from "@/components/auth/sign-in-panel";

export default function AuthPage() {
  const [tab, setTab] = useState<"signin">("signin");

  return (
    <AuthLayout>
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-8 relative overflow-hidden">
        {/* <AuthTabs tab={tab} setTab={setTab} /> */}
        <div className="relative h-[280px]">
          {/* <SignUpPanel visible={tab === "signup"} /> */}
          <SignInPanel visible={tab === "signin"} />
        </div>
      </div>
    </AuthLayout>
  );
}
