import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { APIMethodProps, API_METHOD } from "@services/api-method";

export interface CallBackendAPIProps {
  method: APIMethodProps;
  endpoint: string;
  data?: any;
  extendHeader?: Record<string, string>;
  backendUrl?: string;
}

export const callBackendAPI = async ({
  method,
  endpoint,
  data,
  extendHeader,
  backendUrl,
}: CallBackendAPIProps) => {
  const defaultRequest = {
    method,
    endpoint,
    data,
    extendHeader,
    backendUrl,
  };
  console.log("[API-GATEWAY]", JSON.stringify(defaultRequest, null, 2));
  const url = `${backendUrl}${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;

  const headers = {
    ...extendHeader,
    Authorization: `Bearer ${process.env.API_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    let response;
    switch (method) {
      case API_METHOD.GET:
        response = await axios.get(url, { headers });
        break;
      case API_METHOD.POST:
        response = await axios.post(url, data, { headers });
        break;
      case API_METHOD.PUT:
        response = await axios.put(url, data, { headers });
        break;
      case API_METHOD.DELETE:
        response = await axios.delete(url, { headers });
        break;
      default:
        throw new Error("Unsupported HTTP method");
    }

    return response.data; // ส่งข้อมูลกลับจาก API
  } catch (error) {
    throw new Error((error as Error).message);
  } finally {
    console.log("API call completed");
  }
};
