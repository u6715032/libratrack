"use client";

export default function DeleteBookButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("Delete this book?")) return;
    await fetch(`/api/books/${id}`, { method: "DELETE" });
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
