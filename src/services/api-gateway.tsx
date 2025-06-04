import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { APIMethodProps, API_METHOD } from "@services/api-method";
import { store } from "@stores/store"; // assuming you have access to the redux store
import { CallAPI } from "@/stores/actions/authentication/call-post-refresh-token";

export interface CallBackendAPIProps {
  method: APIMethodProps;
  endpoint: string;
  data?: any;
  extendHeader?: Record<string, string>;
  backendUrl?: string;
}

const refreshToken = async () => {
  const state = store.getState();
  const { school_id, user_id, token } = state.callRefreshToken.draftValues;
  try {
    const response = await store.dispatch(
      CallAPI({
        school_id,
        user_id,
        token,
      })
    );
    if ("payload" in response && response.payload?.token) {
      process.env.API_TOKEN = response.payload.token;
      return response.payload.token;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
  return null;
};

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

    if (response.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        headers.Authorization = `Bearer ${newToken}`;
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
        }
      }
    }

    return response.data; // ส่งข้อมูลกลับจาก API
  } catch (error) {
    throw new Error((error as Error).message);
  } finally {
    console.log("API call completed");
  }
};
