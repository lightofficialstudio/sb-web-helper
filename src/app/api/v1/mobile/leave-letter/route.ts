import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/services/api-url";
import { getHeaders } from "@/services/api-header";
import { sanitizeForwardHeaders } from "@/services/api-header";
import https from "https";
import { convertToCurl } from "@/helpers/api/convert-to-curl";

const agent = new https.Agent({ rejectUnauthorized: false });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const headers = sanitizeForwardHeaders(request);
    const user_id = searchParams.get("user_id");
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");
    const apiUrl = `${API_URL.PROD_SB_API_URL}`;
    const endpoint = `/api/LeaveLetter/report?userid=${user_id}&dateStart=${start_date}&dateEnd=${end_date}`;
    const callAPI = apiUrl + endpoint;
    const curlCommand = convertToCurl(apiUrl, endpoint);

    const responseFromAPI = await axios.get(callAPI, {
      headers,
      httpsAgent: agent,
    });

    return NextResponse.json(
      { data: responseFromAPI.data, curl: curlCommand },
      {
        status: responseFromAPI.status,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Internal Server Error",
        raw: error.response?.data || null,
      },
      { status: error.response?.status || 500 }
    );
  }
}
