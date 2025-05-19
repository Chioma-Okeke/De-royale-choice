export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden w-full animate-pulse">
      {/* Sidebar Skeleton */}
      {/* <div className="w-64 bg-white p-4 border-r border-gray-200 hidden lg:block">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-6" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded mb-4 w-full" />
        ))}
      </div> */}

      {/* Main Content Skeleton */}
      <div className="flex-1 p-6 space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3" />

        {/* Section 1 */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-5 bg-gray-200 rounded w-full" />
          ))}
        </div>

        {/* Section 2 */}
        <div className="space-y-4 pt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
