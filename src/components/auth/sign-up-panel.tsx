"use client";

export default function SignUpPanel({ visible }: { visible: boolean }) {
  return (
    <div
      className={`absolute w-full transition-all duration-500 ${
        visible
          ? "opacity-100 translate-x-0 z-10"
          : "opacity-0 -translate-x-full z-0 pointer-events-none"
      }`}
    >
      <h2 className="text-xl font-bold text-center mb-1">Get Started Today!</h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        Join us and dive into the world of computer vision.
      </p>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="name@company.com"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg"
        />
        <input
          type="password"
          placeholder="••••••••"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg"
        />
        <button className="w-full bg-blue-900 text-white py-2 rounded-full font-semibold">
          Free Sign Up
        </button>
      </form>
    </div>
  );
}
