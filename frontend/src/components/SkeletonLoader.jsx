const SkeletonLoader = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className="premium-card p-5 bg-white dark:bg-slate-800 border-l-4 border-l-slate-300 dark:border-l-slate-600 shadow-sm dark:shadow-slate-900/50"
          style={{
            animationDelay: `${i * 100}ms`,
          }}
        >
          {/* Title skeleton */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="skeleton h-5 w-3/4 mb-2 bg-slate-200 dark:bg-slate-700 rounded animate-shimmer"></div>
            </div>
            <div className="flex gap-1">
              <div className="skeleton h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-md animate-shimmer"></div>
              <div className="skeleton h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-md animate-shimmer"></div>
            </div>
          </div>
          
          {/* Description skeleton */}
          <div className="space-y-2 mb-3">
            <div className="skeleton h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-shimmer"></div>
            <div className="skeleton h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-shimmer"></div>
          </div>
          
          {/* Footer skeleton */}
          <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-700">
            <div className="skeleton h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-shimmer"></div>
            <div className="skeleton h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

