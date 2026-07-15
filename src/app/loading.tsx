export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="animate-pulse space-y-8">
        {/* Title skeleton */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto h-8 w-48 rounded-lg bg-muted" />
          <div className="mx-auto mt-4 h-4 w-96 max-w-full rounded-lg bg-muted" />
        </div>

        {/* Card skeleton */}
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6">
          <div className="h-12 w-full rounded-xl bg-muted" />
          <div className="mt-4 h-11 w-full rounded-xl bg-muted" />
        </div>

        {/* Grid skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <div className="h-10 w-10 rounded-xl bg-muted" />
              <div className="mt-4 h-4 w-32 rounded bg-muted" />
              <div className="mt-2 h-3 w-full rounded bg-muted" />
              <div className="mt-1 h-3 w-3/4 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
