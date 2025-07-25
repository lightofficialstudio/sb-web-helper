import {NextRequest, NextResponse} from "next/server";
import {API_URL} from "@/services/api-url";
import {callWithLogging} from "@helpers/call-with-logging";
import {convertToCurl} from "@helpers/api/convert-to-curl";

export async function GET(request: NextRequest) {
    const apiUrl = API_URL.DEV_HARDWARE_API_URL;
    const endpoint = "/api/v2/applications";
    const fullURL = `${apiUrl}${endpoint}`;
    const curlCommand = convertToCurl(apiUrl, endpoint);

    try {
        const response = await callWithLogging(
            {
                method: "GET",
                url: fullURL,
                // สามารถใส่ headers หรือ httpsAgent ได้หากจำเป็น
            },
            {
                requestPath: request.nextUrl.pathname,
                method: "GET",
                curl: curlCommand,
            }
        );

        return NextResponse.json(
            {
                data: response.data,
                curl: curlCommand,
            },
            {status: response.status}
        );
    } catch (error: any) {
        const statusCode = error.response?.status || 500;
        return NextResponse.json(
            {
                message: error.message || "Internal Server Error",
                raw: error.response?.data || null,
            },
            {status: statusCode}
        );
    }
}