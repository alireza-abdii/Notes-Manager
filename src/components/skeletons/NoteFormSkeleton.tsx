import { motion } from 'framer-motion';

export function NoteFormSkeleton() {
  return (
    <motion.div layout transition={{ duration: 0.3 }} className="h-full w-full">
      <div className="card w-full border border-amber-100 dark:border-slate-700">
        <div className="w-full space-y-3">
          {/* Title field skeleton */}
          <div>
            <div className="mb-1 h-4 w-16 animate-pulse rounded bg-amber-200 dark:bg-slate-600" />
            <div className="h-10 w-full animate-pulse rounded-md bg-amber-100 dark:bg-slate-700" />
          </div>

          {/* Content field skeleton */}
          <div>
            <div className="mb-1 h-4 w-20 animate-pulse rounded bg-amber-200 dark:bg-slate-600" />
            <div className="h-24 w-full animate-pulse rounded-md bg-amber-100 dark:bg-slate-700" />
          </div>

          {/* Tags field skeleton */}
          <div>
            <div className="mb-1 h-4 w-12 animate-pulse rounded bg-amber-200 dark:bg-slate-600" />
            <div className="h-10 w-full animate-pulse rounded-md bg-amber-100 dark:bg-slate-700" />
          </div>

          {/* Buttons skeleton */}
          <div className="flex gap-2">
            <div className="h-10 flex-1 animate-pulse rounded-md bg-amber-200 dark:bg-slate-600" />
            <div className="h-10 w-20 animate-pulse rounded-md bg-amber-200 dark:bg-slate-600" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
