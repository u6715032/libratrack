"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditMemberPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/members/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/members/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.message || "Update failed");
      return;
    }

    router.push("/members");
    router.refresh();
  }

  if (!form) return <p className="text-zinc-400">Loading...</p>;

  return (
    <div className="max-w-xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Member</h1>
        <p className="text-sm text-zinc-400 mt-1">Update member details</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-5"
      >
        <Field label="Name">
          <input
            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>

        <Field label="Email">
          <input
            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>

        <Field label="Phone">
          <input
            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>

        <Field label="Address">
          <input
            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
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
            onClick={() => router.push("/members")}
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
