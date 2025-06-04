import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/services/api-url";
import { getHeaders } from "@/services/api-header";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const headers = Object.fromEntries(request.headers.entries());
    const user_id = searchParams.get("user_id");
    const page = searchParams.get("page");
    const apiUrl = `${API_URL.PROD_SB_API_URL}`;
    const endpoint = `/Notification/week/${user_id}?page=${page}&lang=en`;
    const callAPI = apiUrl + endpoint;
    console.log("request header", headers);

    const responseFromAPI = await axios.get(callAPI, {
      headers,
    });

    return NextResponse.json(responseFromAPI.data, {
      status: responseFromAPI.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: error.response?.status || 500 }
    );
  }
}
