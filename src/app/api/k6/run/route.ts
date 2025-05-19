// POST /api/performance/k6/run
import { NextResponse } from "next/server";
import { exec } from "child_process";

export const dynamic = "force-dynamic";

export async function POST() {
  return new Promise((resolve) => {
    exec(
      "k6 run path/to/script.js --out json=result.json",
      (err, stdout, stderr) => {
        if (err) {
          return resolve(NextResponse.json({ error: stderr }, { status: 500 }));
        }
        // อ่านผลจากไฟล์ result.json หรือ stdout แล้ว return
        resolve(NextResponse.json({ output: stdout }));
      }
    );
  });
}
