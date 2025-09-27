"use client";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <html>
      <body className="h-screen w-full flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-red-600 mt-4">
            Oops! Something went wrong
          </h2>

          {/* Error message */}
          <p className="text-gray-500 mt-2 text-sm">
            {error.message || "Unexpected error occurred. Please try again."}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push("/")}
              className="px-5 py-2 bg-gray-200 p-2 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              Go Home
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
