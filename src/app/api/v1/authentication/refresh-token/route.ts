import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/services/api-url";
import { headers } from "@/services/api-header";
import axios from "axios";
import { RequestRefreshToken } from "@/stores/type";

export async function POST(request: NextRequest) {
  try {
    const { school_id, user_id, token }: RequestRefreshToken["draftValues"] =
      await request.json();
    const apiUrl = `${API_URL.PROD_SB_API_URL}`;
    const endpoint = `/api/v1/tokens/refresh`;
    const callAPI = apiUrl + endpoint;
    // * Example for temporary
    const temp_school_id = "849";
    const temp_user_id = "1233752";
    const temp_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ijc3NDkiLCJlbWFpbCI6Ijc3NDlfODQ5XzFAc2Nob29sYnJpZ2h0LmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3Bvc3RhbGNvZGUiOiI4NDkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMjMzNzUyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvaGFzaCI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiI1LzEwLzIwMjUgNToyNzoyNiBQTSIsIm5iZiI6MTc0NjU1MjQ0NiwiZXhwIjoxNzQ2ODk4MDQ2LCJpYXQiOjE3NDY1NTI0NDZ9.wV-kl_en3aaQTGCziL9Oy5bhvOaqKGKcjyQiXWZ1LfU";
    const payload = {
      SchoolID: temp_school_id,
      OldToken: temp_token,
      sID: temp_user_id,
    };

    const responseFromAPI = await axios.post(callAPI, payload, { headers });

    return NextResponse.json({
      status: responseFromAPI.status,
      data: responseFromAPI.data,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message || "Internal Server Error",
      status: error.response.status || 500,
    });
  }
}
