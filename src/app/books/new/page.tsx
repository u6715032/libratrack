"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBookPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    isbn: "",
    category: "",
    author: "",
    publishedYear: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        publishedYear: Number(form.publishedYear),
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.message || "Create failed");
      return;
    }

    router.push("/books");
    router.refresh();
  }

  return (
    <div className="max-w-xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Book</h1>
        <p className="text-sm text-zinc-400 mt-1">Create a new book entry</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-5"
      >
        <Field label="Title">
          <input
            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Book title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Field>

        <Field label="ISBN">
          <input
            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Unique ISBN"
            required
            value={form.isbn}
            onChange={(e) => setForm({ ...form, isbn: e.target.value })}
          />
        </Field>

        <Field label="Category">
          <input
            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="e.g. Productivity"
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </Field>

        <Field label="Author">
          <input
            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Author name"
            required
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
        </Field>

        <Field label="Published Year">
          <input
            type="number"
            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="e.g. 2016"
            required
            value={form.publishedYear}
            onChange={(e) => setForm({ ...form, publishedYear: e.target.value })}
          />
        </Field>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => router.push("/books")}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </form>
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
