export default function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: 'bg-ruby/10 text-ruby',
    contacted: 'bg-amber-100 text-amber-800',
    closed: 'bg-emerald-100 text-emerald-800',
    published: 'bg-emerald-100 text-emerald-800',
    draft: 'bg-gray-200 text-gray-700',
    sold: 'bg-amber-100 text-amber-800',
  }
  return (
    <span className={`shrink-0 text-xs font-semibold capitalize px-3 py-1 rounded-full ${styles[status] ?? 'bg-gray-100'}`}>
      {status}
    </span>
  )
}
