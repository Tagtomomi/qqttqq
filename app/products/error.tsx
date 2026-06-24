"use client";

import SupabaseSetupNotice from "@/components/SupabaseSetupNotice";

export default function ProductsError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <SupabaseSetupNotice message={error.message} />
    </div>
  );
}
