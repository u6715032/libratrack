"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function BorrowPage() {
  const router = useRouter();

  const [books, setBooks] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const availableBooks = useMemo(
    () => books.filter((b) => b.status === "available"),
    [books]
  );

  useEffect(() => {
    Promise.all([fetch("/api/books"), fetch("/api/members")])
      .then(async ([b, m]) => [await b.json(), await m.json()])
      .then(([bData, mData]) => {
        setBooks(bData);
        setMembers(mData);
      });
  }, []);

  async function handleBorrow(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/borrow-records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookId: selectedBook,
        memberId: selectedMember,
        dueDate: new Date(dueDate).toISOString(),
      }),
    });

    let data: any = {};
    try {
      data = await res.json();
    } catch {}

    setLoading(false);

    if (!res.ok) {
      alert(data.message || "Borrow failed");
      return;
    }

    router.push("/books");
    router.refresh();
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Borrow</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Assign an available book to a member
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 max-w-2xl">
        <form onSubmit={handleBorrow} className="space-y-5">
          <Field label="Book (available only)">
            <select
              className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
            >
              <option value="">Select book</option>
              {availableBooks.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.title} — {b.author}
                </option>
              ))}
            </select>
            <div className="text-xs text-zinc-500 mt-2">
              Available: {availableBooks.length} / {books.length}
            </div>
          </Field>

          <Field label="Member">
            <select
              className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <option value="">Select member</option>
              {members.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name} — {m.email}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Due date">
            <input
              type="date"
              className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Field>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 disabled:opacity-50"
            >
              {loading ? "Borrowing..." : "Borrow"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-sm font-medium text-zinc-300 mb-2">{label}</div>
      {children}
    </div>
  );
}
