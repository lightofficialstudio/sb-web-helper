"use client";

export default function SignInPanel({ visible }: { visible: boolean }) {
  return (
    <div
      className={`absolute w-full transition-all duration-500 ${
        visible
          ? "opacity-100 translate-x-0 z-10"
          : "opacity-0 translate-x-full z-0 pointer-events-none"
      }`}
    >
      <h2 className="text-xl font-bold text-center mb-1 text-gray-700">
        ยินดีต้อนรับ
      </h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        โปรดใช้ username และ password เดียวกันกับ
        https://adminsystem.schoolbright.co/
      </p>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="กรอกอีเมลล์"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg text-black"
        />
        <input
          type="password"
          placeholder="••••••••"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg text-black"
        />
        <button className="w-full bg-blue-900 text-white py-2 rounded-full font-semibold">
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
}
