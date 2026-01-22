export const FileSkeleton = () => (
  <div className="animate-pulse bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex items-center space-x-4">
      <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);


