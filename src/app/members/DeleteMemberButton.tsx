"use client";

export default function DeleteMemberButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("Delete this member?")) return;
    await fetch(`/api/members/${id}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-red-200 hover:bg-red-500/20"
    >
      Delete
    </button>
  );
}
