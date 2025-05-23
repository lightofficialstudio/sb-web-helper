"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@stores/store";
import { CallAPI } from "@stores/actions/call-school-list";
import { setDraftValues } from "@/stores/reducers/call-school-list";

export default function SchoolReduxProvider({
  children,
}: Readonly<React.PropsWithChildren<{}>>) {
  const dispatch = useDispatch<AppDispatch>();
  const schoolState = useAppSelector((state) => state.callSchoolList);

  useEffect(() => {
    callSchoolList();
  }, []);

  const callSchoolList = async () => {
    try {
      const response = await dispatch(CallAPI()).unwrap();
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return <>{children}</>;
}
