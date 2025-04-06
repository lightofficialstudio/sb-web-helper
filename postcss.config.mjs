/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: { config: "./config/tailwind.config.ts" }, // เพิ่มพาธที่ถูกต้อง
    autoprefixer: {},
  },
};

export default config;
