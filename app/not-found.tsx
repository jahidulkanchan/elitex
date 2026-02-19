import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="text-center max-w-md">
        {/* 404 */}
        <h1 className="text-7xl font-bold tracking-tight mb-4">404</h1>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-8">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Action */}
        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}