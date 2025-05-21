// /app/api/v1/support/check-nfc/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const SchoolID = searchParams.get("SchoolID");
  const NFC = searchParams.get("NFC");

  if (!SchoolID || !NFC) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const response = await axios.get(
      `https://paysb.schoolbright.co/api/shop/user/getuserinfo?SchoolID=${SchoolID}&NFC=${NFC}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.response?.status || 500 }
    );
  }
}
