export default async function DashboardPage() {
  const res = await fetch("http://localhost:3000/api/dashboard", { cache: "no-store" });
  const data = await res.json();

  const cards = [
    { label: "Total Books", value: data.totalBooks },
    { label: "Available", value: data.availableBooks },
    { label: "Borrowed", value: data.borrowedBooks },
    { label: "Total Members", value: data.totalMembers },
    { label: "Active Borrows", value: data.activeBorrows },
    { label: "Total Records", value: data.totalRecords },
  ];

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-zinc-400 mt-1">Library overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 shadow-sm"
          >
            <div className="text-sm text-zinc-400">{c.label}</div>
            <div className="text-3xl font-extrabold mt-2">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
