import Link from "next/link";
import DeleteMemberButton from "./DeleteMemberButton";

export default async function MembersPage() {
  const res = await fetch("http://localhost:3000/api/members", { cache: "no-store" });
  const members = await res.json();

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Members</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage members</p>
        </div>

        <Link
          href="/members/new"
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
        >
          + Add Member
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-zinc-300">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-left font-semibold">Phone</th>
              <th className="px-4 py-3 text-left font-semibold">Address</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="text-zinc-200">
            {members.map((m: any) => (
              <tr key={m._id} className="border-t border-white/10">
                <td className="px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3 text-zinc-300">{m.email}</td>
                <td className="px-4 py-3">{m.phone}</td>
                <td className="px-4 py-3">{m.address}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/members/${m._id}/edit`}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10"
                    >
                      Edit
                    </Link>
                    <DeleteMemberButton id={m._id} />
                  </div>
                </td>
              </tr>
            ))}

            {members.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-zinc-400" colSpan={5}>
                  No members yet. Add one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
