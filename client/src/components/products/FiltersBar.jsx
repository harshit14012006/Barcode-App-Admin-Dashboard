// components/products/FiltersBar.jsx
import { Download, Search, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FiltersBar({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  sortOption,
  setSortOption,
  exportToCSV,
}) {
  const [openCategory, setOpenCategory] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [categories, setCategories] = useState([]);

  // 🔹 Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/categories");
        setCategories(data); // [{_id, name, description}, ...]
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-md rounded-2xl p-4 mb-8 flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-between">
      
      {/* 🔍 Search Box */}
      <div className="relative w-full sm:w-1/3">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by name or barcode..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-xl shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-green-500 
                     transition text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* 🏷 Category Filter */}
      <div className="relative w-full sm:w-44">
        <button
          onClick={() => setOpenCategory(!openCategory)}
          className="w-full px-3 py-2.5 flex items-center justify-between 
                     bg-white border rounded-xl shadow-sm text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-green-500
                     transition-all duration-200"
        >
          <span>
            {categoryFilter === "all"
              ? "All Categories"
              : categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}
          </span>
          <ChevronDown
            size={16}
            className={`ml-2 transition-transform ${openCategory ? "rotate-180" : ""}`}
          />
        </button>

        {openCategory && (
          <div className="absolute mt-1 w-full bg-white border rounded-xl shadow-lg z-10 overflow-hidden">
            <div
              onClick={() => {
                setCategoryFilter("all");
                setOpenCategory(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-orange-50 ${
                categoryFilter === "all"
                  ? "bg-gradient-to-r from-green-100 to-orange-100 font-medium"
                  : ""
              }`}
            >
              All Categories
            </div>

            {categories.map((cat) => (
              <div
                key={cat._id}
                onClick={() => {
                  setCategoryFilter(cat.name.toLowerCase());
                  setOpenCategory(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-orange-50 ${
                  categoryFilter === cat.name.toLowerCase()
                    ? "bg-gradient-to-r from-green-100 to-orange-100 font-medium"
                    : ""
                }`}
              >
                {cat.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ↕️ Sort Options */}
      <div className="relative w-full sm:w-44">
        <button
          onClick={() => setOpenSort(!openSort)}
          className="w-full px-3 py-2.5 flex items-center justify-between 
                     bg-white border rounded-xl shadow-sm text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-green-500
                     transition-all duration-200"
        >
          <span>
            {sortOption === "none"
              ? "Sort"
              : sortOption === "name-asc"
              ? "Name (A–Z)"
              : sortOption === "name-desc"
              ? "Name (Z–A)"
              : sortOption === "price-asc"
              ? "Price (Low–High)"
              : "Price (High–Low)"}
          </span>
          <ChevronDown
            size={16}
            className={`ml-2 transition-transform ${openSort ? "rotate-180" : ""}`}
          />
        </button>

        {openSort && (
          <div className="absolute mt-1 w-full bg-white border rounded-xl shadow-lg z-10 overflow-hidden">
            {[
              { value: "none", label: "Sort" },
              { value: "name-asc", label: "Name (A–Z)" },
              { value: "name-desc", label: "Name (Z–A)" },
              { value: "price-asc", label: "Price (Low–High)" },
              { value: "price-desc", label: "Price (High–Low)" },
            ].map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  setSortOption(opt.value);
                  setOpenSort(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-orange-50 ${
                  sortOption === opt.value
                    ? "bg-gradient-to-r from-green-100 to-orange-100 font-medium"
                    : ""
                }`}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📥 Export Button */}
      <button
        onClick={exportToCSV}
        className="px-5 py-2.5 flex items-center gap-2 
                   bg-gradient-to-r from-green-600 to-orange-500 
                   text-white font-medium rounded-xl shadow 
                   hover:opacity-90 hover:shadow-md 
                   transition-all duration-200"
      >
        <Download size={18} />
        Export CSV
      </button>
    </div>
  );
}
