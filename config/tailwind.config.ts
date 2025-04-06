import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ตรวจสอบว่าพาธนี้ยังคงถูกต้อง
  ],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse 10s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
