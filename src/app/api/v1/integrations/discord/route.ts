import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const event = req.headers.get("x-github-event");

  if (event !== "pull_request" || payload.action !== "opened") {
    return NextResponse.json({
      message: "Not a pull_request opened event",
      status: 200,
    });
  }

  console.log("Received pull_request opened event:", payload);

  try {
    const pr = payload.pull_request;
    const title = pr.title;
    const url = pr.html_url;
    const author = pr.user.login;

    const repoName = payload.repository.full_name;
    const fromBranch = pr.head.ref;
    const toBranch = pr.base.ref;
    let mentionUser = "";

    let discordWebhook =
      process.env.NEXT_PUBLIC_WEBHOOK_DISCORD_PULL_REQUEST_SERVER;

    if (
      repoName === "Jabjai-Corporation/robodocs-api-main" ||
      repoName === "Jabjai-Corporation/robodocs-web-main"
    ) {
      mentionUser = "<@1343873740055777353>";
      discordWebhook =
        "https://discord.com/api/webhooks/1385156909312770048/o6lGdMEvDC1E90S1nJSNiO75P6XqbpQtARUDO81FQleudrfT4BK-BsNORB9Ytl_LoDM_";
    } else if (repoName === "Jabjai-Corporation/sb-web-mark_activity") {
      mentionUser = "<@1343873740055777353>";
      discordWebhook =
        "https://discord.com/api/webhooks/1385159489694466088/BUJOXrmMwwE1bM81tFyjCGX6QJUHCowdRm3l9vdQMsid5nPi8mcTTQxn8q-QfPlFV8cX";
    } else {
      mentionUser = "<@692371893826879568>";
      discordWebhook =
        process.env.NEXT_PUBLIC_WEBHOOK_DISCORD_PULL_REQUEST_SERVER;
    }

    const curlHeader = `--header 'Content-Type: application/json'`;
    const curlData = `--data '{
      "content": "📣 **เปิด Pull Request ใหม่!**\\n📝 **${title}**\\n🔗 ${url}\\n👤 โดย: ${author}\\n\\n📌 กรุณาตรวจสอบและ Review ทันที 👀"
    }'`;
    const curlCommand = `curl --location ${curlHeader} '${discordWebhook}' ${curlData}`;

    const discordPayload = {
      content: `${mentionUser} 📣 **มี Pull Request ใหม่เข้ามาแล้ว! (New Pull Request Incoming!)**`,
      embeds: [
        {
          title: `#${pr.number} ${title}`,
          url: url,
          color: 0x00ccff,
          fields: [
            { name: "🧑‍💻 ผู้เปิด (Author)", value: author, inline: true },
            {
              name: "📁 Repository (ที่เก็บโค้ด)",
              value: `\`${repoName}\``,
              inline: true,
            },
            {
              name: "🌿 จากสาขา (From Branch) → ไปยัง (To Branch)",
              value: `\`${fromBranch}\` → \`${toBranch}\``,
              inline: false,
            },
          ],
          footer: {
            text: "ระบบแจ้งเตือน GitHub PR • SchoolBright (GitHub PR Notifier • SchoolBright)",
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const response = await axios.post(discordWebhook!, discordPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Discord response:", response.data);

    return NextResponse.json({
      message: "Notification sent to Discord",
      status: response.status,
      curl: curlCommand,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message || "Internal Server Error",
      status: err.response?.status || 500,
    });
  }
}
