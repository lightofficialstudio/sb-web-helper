import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const event = req.headers.get("x-github-event");

  if (event !== "push") {
    return NextResponse.json({
      message: "Not a push event",
      status: 200,
    });
  }

  console.log("Received push event:", payload);

  try {
    const repoName = payload.repository.full_name;
    const branch = payload.ref.replace("refs/heads/", "");
    if (!payload.ref?.startsWith("refs/heads/release/")) {
      return NextResponse.json({
        message: "Not a release branch",
        status: 200,
      });
    }
    const pusher = payload.pusher.name;
    const compareUrl =
      typeof payload.compare === "string" && payload.compare.startsWith("http")
        ? payload.compare
        : undefined;
    const commits = payload.commits || [];

    const commitMessages = commits
      .map((commit: any, index: number) => {
        return `> \u2022 [${commit.id.substring(0, 7)}](${commit.url}) - ${
          commit.message
        } (by ${commit.author?.name || "unknown"})`;
      })
      .join("\n");

    const discordWebhook =
      process.env.NEXT_PUBLIC_WEBHOOK_DISCORD_PULL_REQUEST_SERVER;

    if (!discordWebhook || !discordWebhook.startsWith("http")) {
      return NextResponse.json({
        message: "Invalid Discord webhook URL",
        status: 500,
      });
    }

    const discordPayload = {
      content: `🚀 **[Push Event Detected]** ระบบได้รับการอัปเดตใหม่แล้ว! `,
      embeds: [
        {
          title: `📁 ${repoName} (${branch})`,
          ...(compareUrl ? { url: compareUrl } : {}),
          color: 0x36a64f,
          fields: [
            {
              name: "📌 Branch",
              value: `\`${branch}\`: \`${
                payload.before?.substring(0, 7) || "-"
              }\` → \`${payload.after?.substring(0, 7) || "-"}\``,
            },
          ],
          description:
            commits.length > 0
              ? commitMessages
              : "ไม่มี commit message ที่สามารถแสดงได้",
          footer: {
            text: `Pushed by ${pusher}`,
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const response = await axios.post(discordWebhook, discordPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Discord response:", response.data);

    return NextResponse.json({
      message: "Push notification sent to Discord",
      status: response.status,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message || "Internal Server Error",
      status: err.response?.status || 500,
    });
  }
}
