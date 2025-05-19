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

  const generateCurl = (req: any): string => {
    const url = `${req.url.protocol}://${req.url.host.join(
      "."
    )}/${req.url.path.join("/")}`;
    const method = req.method;
    const headers = (req.header || [])
      .map((h: any) => `-H "${h.key}: ${h.value}"`)
      .join(" ");
    const body = req.body ? req.body.raw ?? JSON.stringify(req.body) : "";
    const data = body ? `--data '${body}'` : "";
    return `curl -X ${method} "${url}" ${headers} ${data}`.trim();
  };

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
      curl: generateCurl(item.request),
    }));

    return result;
  }

  const POST_NEWMAN = async () => {
    const response = await dispatch(runPostmanCollection());
  };

  const renderMinimalRows = (count: number) =>
    Array.from({ length: count }).map((_, index) => (
      <MinimalRow key={index}>
        {(props) => {
          const row = props.row;
          return (
            <>
              <td className="p-4 font-medium text-sm text-gray-900">{index}</td>
              <td className="p-4 font-medium text-sm text-gray-900">
                {row?.curl}
              </td>
              <td className="p-4">
                <MethodBadge method={row?.method} />
              </td>
              <td className="p-4 text-sm text-gray-700 break-words">
                {row?.url}
              </td>
              <td className="p-4">
                <StatusBadge status={row?.code} />
              </td>
              <td className="p-4 text-right text-sm tabular-nums text-gray-800">
                {row?.time.toFixed(2)} ms
              </td>
              <td className="p-4">
                <button
                  onClick={() => setSelectedDetail(row)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Info
                </button>
              </td>
            </>
          );
        }}
      </MinimalRow>
    ));

  React.useEffect(() => {
    console.log("tableData", executions);
  }, [executions]);

  return (
    <DashboardLayout>
      {isLoading && <LoadingOverlay />}
      <div className="flex justify-end">
        <MinimalButton
          onClick={() => POST_NEWMAN()}
          iconRight={<HiOutlineMail />}
          textSize="base"
        >
          Run Collection
        </MinimalButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6 w-full">
        {/* บังคับให้ card แรกอยู่เต็มความกว้างใน md และ xl */}
        <ContentCard
          title="Welcome"
          fullWidth
          className="md:col-span-2 xl:col-span-4 w-full"
        >
          {t("welcome")} <p>Hello Marlon 👋 Welcome back to your dashboard.</p>
        </ContentCard>

        {/* Card ธรรมดา */}
        {selectedDetail && (
          <MinimalModal
            title={`🧪 ${selectedDetail.name}`}
            onClose={() => setSelectedDetail(null)}
          >
            {ModalAPIDetail(selectedDetail)}
          </MinimalModal>
        )}
        <ContentCard title="Tasks" className="xl:col-span-4 w-full">
          <MinimalTable
            isLoading={isLoading}
            header={headerRow}
            data={tableData}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={setRowsPerPage}
          >
            {renderMinimalRows(rowsPerPage)}
          </MinimalTable>
        </ContentCard>
      </div>
    </DashboardLayout>
  );
}
