// Tiny classnames joiner — avoids pulling in clsx/tailwind-merge for one job.
export function cn(...values) {
  return values.filter(Boolean).join(' ')
}
