import { NoteSkeleton } from './NoteSkeleton';

interface NoteListSkeletonProps {
  count?: number;
}

export function NoteListSkeleton({ count = 6 }: NoteListSkeletonProps) {
  return (
    <div className="space-y-4">
      {/* Search and filter skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative md:w-96">
          <div className="h-10 w-full animate-pulse rounded-md bg-amber-100 dark:bg-slate-700" />
        </div>
        <div>
          <div className="h-10 w-full animate-pulse rounded-md bg-amber-100 dark:bg-slate-700 sm:w-48" />
        </div>
      </div>

      {/* Notes grid skeleton */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <NoteSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
