export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full animate-pulse">
      {/* Image + Badge */}
      <div className="relative">
        <div className="w-full h-40 sm:h-48 bg-gray-200" />
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 h-5 w-16 bg-gray-300 rounded" />
      </div>

      <div className="p-3 sm:p-4 space-y-3">
        {/* Title */}
        <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4" />

        {/* Address */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded-full" />
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3" />
        </div>

        {/* Price + Capacity */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2">
            <div className="h-5 sm:h-6 bg-gray-200 rounded w-16 sm:w-20" />
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-10" />
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
