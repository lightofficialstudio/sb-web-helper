import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { API_URL } from "@/services/api-url";

export async function POST(request: NextRequest, response: NextResponse) {
  const { SchoolID, sID, sID2, sSellID } = await request.json();

  const data = {
    SchoolID,
    sID,
    sID2,
    sSellID,
  };

  if (!SchoolID || !sID || !sID2 || !sSellID) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const apiUrl = `${API_URL.PROD_PAYMENT_API_URL}/api/shop/sales/cancelsales`;
    const curlHeader = `--header 'Content-Type: application/json'`;
    const curlData = `--data '{
      "SchoolID" : ${SchoolID},
      "sID": ${sID},
      "sID2": ${sID2},
      "sSellID": ${sSellID}
    }'`;
    const curlCommand = `curl --location ${curlHeader} \ '${apiUrl}' \ ${curlData}`;

    const responseFromAPI = await axios.post(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });

    return NextResponse.json({
      data: responseFromAPI.data,
      curl: curlCommand,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.response?.status || 500 }
    );
  }
}
