"use client";
import React, { useState } from "react";
import DashboardHeader from "@components/layouts/backend/dashboard-header";
import DashboardLayout from "@components/layouts/backend-layout";
import TimeChart from "@components/layouts/backend/time-chart";
import TaskOverview from "@components/layouts/backend/task-overview";
import ContentCard from "@components/layouts/backend/content";
import { useTranslation } from "react-i18next";
import MinimalButton from "@components/button/minimal-button-component";
import { HiOutlineMail } from "react-icons/hi";
import MinimalTable from "@components/table/minimal-table-component"; // หรือใช้ FiMail จาก react-icons/fi
import collection from "@/data/postman/collection-school-bright-v2.json";
import { MinimalRow } from "@components/table/minimal-row-component";
import MinimalModal from "@components/modal/minimal-modal-component";
import ModalAPIDetail from "@components/modal/info-api-modal-detail-component";
import StatusBadge from "@components/badge/status-badge-component";
import MethodBadge from "@components/badge/method-badge-component";
import LoadingOverlay from "@components/loading/loading-component-1";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@stores/store";
import { runPostmanCollection } from "@stores/actions/call-newman";

export default function DashboardPage() {
  const { t } = useTranslation("mock");
  const dispatch = useDispatch();
  const newmanState = useAppSelector((state) => state.newman); // จาก newmanReducer

  const [selectedDetail, setSelectedDetail] = useState<any | null>(null);
  const executions = newmanState.result || [];
  const tableData = mapExecutionToRowData(executions);
  const isLoading = newmanState.loading;
  const headerRow = ["no.", "name", "method", "url", "status", "time", "info"];
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function mapExecutionToRowData(executions: any[]) {
    const result = executions.map((item) => ({
      name: item.item.name,
      method: item.request.method,
      url: `${item.request.url.protocol}://${item.request.url.host.join(
        "."
      )}/${item.request.url.path.join("/")}`,
      status: item.response?.status || "Unknown",
      time: item.response?.responseTime || 0,
      request: item.request,
      response: item.response,
      headers: item.request.header,
      assertions: item.assertions, // ✅ เพิ่มตรงนี้
      code: item?.response?.code || "0",
      raw: item || [],
    }));

    return result;
  }

  React.useEffect(() => {
    console.log("tableData", executions);
  }, [executions]);

  return (
    <DashboardLayout>
      {isLoading && <LoadingOverlay />}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6 w-full">
        {/* บังคับให้ card แรกอยู่เต็มความกว้างใน md และ xl */}
        <ContentCard
          title="Welcome"
          fullWidth
          className="md:col-span-2 xl:col-span-4 w-full"
        >
          {t("welcome")} <p>Hello Support 👋 Welcome back to your dashboard.</p>
        </ContentCard>

        <ContentCard title="Tasks" className="xl:col-span-4 w-full">
          <div></div>
        </ContentCard>

        <ContentCard title="Reports" className="xl:col-span-2 w-full">
          <p>Reports ready to download</p>
        </ContentCard>
      </div>
    </DashboardLayout>
  );
}
