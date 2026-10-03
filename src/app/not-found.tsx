import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-[#1F130B] text-white">
      <h2 className="text-4xl font-extrabold text-[#E67E22] mb-2">404</h2>
      <p className="text-lg font-bold mb-4">Page Not Found</p>
      <p className="text-xs text-stone-400 max-w-sm mb-6">
        The handcrafted page you are looking for does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-[#E67E22] hover:bg-[#cf6d17] text-white font-bold text-xs shadow-md transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
