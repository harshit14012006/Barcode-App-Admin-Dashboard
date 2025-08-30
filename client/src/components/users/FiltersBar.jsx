//components/users/FiltersBar
export default function FiltersBar({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  sortOption,
  setSortOption,
  exportToCSV,
}) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 mb-8 flex flex-col sm:flex-row flex-wrap gap-3 items-center justify-between">
      <input
        type="text"
        placeholder="🔍 Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="w-full sm:w-40 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="all">All Roles</option>
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
      </select>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="w-full sm:w-40 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="none">Sort</option>
        <option value="name-asc">Name (A–Z)</option>
        <option value="name-desc">Name (Z–A)</option>
        <option value="role">By Role</option>
      </select>
      <button
        onClick={exportToCSV}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        ⬇ Export CSV
      </button>
    </div>
  );
}
