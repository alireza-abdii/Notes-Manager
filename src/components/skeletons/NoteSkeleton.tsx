import { motion } from 'framer-motion';
import { Card } from '../ui';

export function NoteSkeleton() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="border border-amber-100 dark:border-slate-700">
        {/* Title skeleton */}
        <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-amber-200 dark:bg-slate-600" />

        {/* Content skeleton - multiple lines */}
        <div className="mb-3 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-amber-100 dark:bg-slate-700" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-amber-100 dark:bg-slate-700" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-amber-100 dark:bg-slate-700" />
        </div>

        {/* Tags skeleton */}
        <div className="mb-3 flex flex-wrap gap-1">
          <div className="h-6 w-16 animate-pulse rounded-full bg-amber-200 dark:bg-slate-600" />
          <div className="h-6 w-12 animate-pulse rounded-full bg-amber-200 dark:bg-slate-600" />
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between border-t border-amber-100 pt-3 dark:border-slate-700">
          <div className="h-4 w-20 animate-pulse rounded bg-amber-100 dark:bg-slate-700" />
          <div className="flex gap-2">
            <div className="h-8 w-8 animate-pulse rounded bg-amber-200 dark:bg-slate-600" />
            <div className="h-8 w-8 animate-pulse rounded bg-amber-200 dark:bg-slate-600" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
