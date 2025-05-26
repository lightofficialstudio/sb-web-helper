import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { API_URL } from "@/services/api-url";

export async function POST(NextRequest: NextRequest) {
  const { school_id, device_id } = await NextRequest.json();
  try {
    const endpoint = `/api/device/status/registeronline`;
    const apiUrl = `${API_URL.PROD_PAYMENT_API_URL}` + `${endpoint}`;
    const payload = {
      SchoolID: school_id,
      DeviceID: device_id,
      Status: "Online",
    };
    const responseFromAPI = await axios.post(apiUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({
      data: responseFromAPI.data,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message || "Internal Server Error",
      status: err.response?.status || 500,
    });
  }
}
