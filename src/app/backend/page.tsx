"use client"
import DashboardHeader from "@components/layouts/backend/dashboard-header";
import DashboardLayout from "@components/layouts/backend-layout";
import TimeChart from "@components/layouts/backend/time-chart";
import TaskOverview from "@components/layouts/backend/task-overview";
import ContentCard from "@components/layouts/backend/content";
import {useTranslation} from "react-i18next";

export default function DashboardPage() {
     const { t } = useTranslation("mock");
    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6 w-full">

                {/* บังคับให้ card แรกอยู่เต็มความกว้างใน md และ xl */}
                <ContentCard title="Welcome" fullWidth className="md:col-span-2 xl:col-span-4 w-full">
                    {t("welcome")}  <p>Hello Marlon 👋 Welcome back to your dashboard.</p>
                </ContentCard>

                {/* Card ธรรมดา */}
                <ContentCard title="Tasks" className="xl:col-span-2 w-full" isLoading={true}>
                    <p>Pending: 4</p>
                </ContentCard>

                <ContentCard title="Reports" className="xl:col-span-2 w-full">
                    <p>Reports ready to download</p>
                </ContentCard>
            </div>
        </DashboardLayout>
    );
}
