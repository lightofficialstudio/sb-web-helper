import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { API_URL } from "@/services/api-url";

export async function GET() {
  try {
    const endpoint = `/api/shop/device/getregisterdevicelist`;
    const apiUrl = `${API_URL.PROD_PAYMENT_API_URL}` + `${endpoint}`;
    const responseFromAPI = await axios.get(apiUrl, {
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
