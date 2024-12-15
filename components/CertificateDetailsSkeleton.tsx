export function CertificateDetailsSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4 mx-auto w-3/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="h-4 bg-gray-200 rounded mx-auto w-2/3"></div>
      </div>
    </div>
  )
}

