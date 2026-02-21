"use client";

import { useEffect, useMemo, useState } from "react";

export default function ReturnsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/borrow-records")
      .then((r) => r.json())
      .then((data) => setRecords(data));
  }, []);

  const borrowed = useMemo(
    () => records.filter((r) => r.status === "borrowed"),
    [records]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return borrowed;

    return borrowed.filter((r) => {
      const bookTitle = (r.bookId?.title || "").toLowerCase();
      const memberName = (r.memberId?.name || "").toLowerCase();
      const memberEmail = (r.memberId?.email || "").toLowerCase();
      return (
        bookTitle.includes(q) ||
        memberName.includes(q) ||
        memberEmail.includes(q)
      );
    });
  }, [borrowed, query]);

  async function handleReturn(id: string) {
    setLoadingId(id);

    const res = await fetch(`/api/borrow-records/${id}`, { method: "PUT" });
    let data: any = {};
    try {
      data = await res.json();
    } catch {}

    setLoadingId(null);

    if (!res.ok) {
      alert(data.message || "Return failed");
      return;
    }

    const fresh = await fetch("/api/borrow-records").then((r) => r.json());
    setRecords(fresh);
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Returns</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Return borrowed books and free them up
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3">
          <div className="text-xs text-zinc-400">Borrowed now</div>
          <div className="text-2xl font-extrabold">{borrowed.length}</div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-zinc-200">
            Return Queue
          </div>
          <input
            className="w-full max-w-md rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Search by book title / member name / email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-zinc-950/40">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-zinc-300">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Book</th>
                <th className="px-4 py-3 text-left font-semibold">Member</th>
                <th className="px-4 py-3 text-left font-semibold">Due</th>
                <th className="px-4 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="text-zinc-200">
              {filtered.map((r) => (
                <tr key={r._id} className="border-t border-white/10">
                  <td className="px-4 py-3 font-medium">
                    {r.bookId?.title || "Unknown"}
                  </td>

                  <td className="px-4 py-3">
                    {r.memberId?.name || "Unknown"}
                  </td>

                  <td className="px-4 py-3 text-zinc-300">
                    {r.dueDate
                      ? new Date(r.dueDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleReturn(r._id)}
                      disabled={loadingId === r._id}
                      className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 disabled:opacity-50"
                    >
                      {loadingId === r._id ? "Returning..." : "Return"}
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-zinc-400" colSpan={4}>
                    No borrowed records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
