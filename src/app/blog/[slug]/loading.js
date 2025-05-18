export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
        <div className="h-96 bg-gray-300"></div>
        <div className="p-6">
          <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
          
          <div className="flex items-center mb-6">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="mx-3">•</div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="mx-3">•</div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded">
                <div className="h-4 bg-gray-200 rounded w-20 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            ))}
          </div>

          <div className="mb-6">
            <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full mb-3"></div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded w-16"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 