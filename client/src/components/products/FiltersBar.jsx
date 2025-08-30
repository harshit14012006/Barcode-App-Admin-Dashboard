// components/products/FiltersBar.jsx
export default function FiltersBar({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  sortOption,
  setSortOption,
  exportToCSV,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or barcode..."
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="grocery">Grocery</option>
          <option value="clothing">Clothing</option>
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="none">Sort By</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="price-asc">Price Low-High</option>
          <option value="price-desc">Price High-Low</option>
        </select>
      </div>
      <button
        onClick={exportToCSV}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Export CSV
      </button>
    </div>
  );
}
