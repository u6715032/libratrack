import Link from "next/link";
import DeleteBookButton from "./DeleteBookButton";

export default async function BooksPage() {
  const res = await fetch("http://localhost:3000/api/books", { cache: "no-store" });
  const books = await res.json();

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Books</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage your library books</p>
        </div>

        <Link
          href="/books/new"
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
        >
          + Add Book
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-zinc-300">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-left font-semibold">Author</th>
              <th className="px-4 py-3 text-left font-semibold">Year</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="text-zinc-200">
            {books.map((b: any) => (
              <tr key={b._id} className="border-t border-white/10">
                <td className="px-4 py-3 font-medium">{b.title}</td>
                <td className="px-4 py-3">{b.category}</td>
                <td className="px-4 py-3">{b.author}</td>
                <td className="px-4 py-3">{b.publishedYear}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      b.status === "available"
                        ? "bg-emerald-500/15 text-emerald-200 border border-emerald-500/20"
                        : "bg-amber-500/15 text-amber-200 border border-amber-500/20"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/books/${b._id}/edit`}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10"
                    >
                      Edit
                    </Link>
                    <DeleteBookButton id={b._id} />
                  </div>
                </td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-zinc-400" colSpan={6}>
                  No books yet. Add one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
