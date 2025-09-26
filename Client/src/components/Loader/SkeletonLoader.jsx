import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white animate-pulse">
      {/* Question placeholder */}
      <div className="flex justify-between items-center">
        <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      </div>

      {/* Answer placeholder */}
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
      </div>

      {/* Action buttons placeholder */}
      <div className="mt-4 flex gap-3">
        <div className="h-8 w-20 bg-gray-300 rounded-lg"></div>
        <div className="h-8 w-20 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  )
}

export default SkeletonLoader