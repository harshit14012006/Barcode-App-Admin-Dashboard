// components/categories/CategoryTableView.jsx
import { Pencil, Trash2 } from "lucide-react";

export default function CategoryTableView({ categories, onEdit, onDelete }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="bg-white border rounded-xl shadow-md p-6 text-center text-gray-500">
        No categories found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl border">
      {/* Desktop Table */}
      <table className="hidden sm:table w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-6 py-3 text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-sm font-semibold">Description</th>
            <th className="px-6 py-3 text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, idx) => (
            <tr
              key={cat._id}
              className={`${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-green-50 transition`}
            >
              <td className="px-6 py-3 font-medium text-gray-800 truncate max-w-[200px]">
                {cat.name}
              </td>
              <td className="px-6 py-3 text-gray-600 truncate max-w-[280px]">
                {cat.description || "—"}
              </td>
              <td className="px-6 py-3 flex gap-2">
                <button
                  onClick={() => onEdit(cat)}
                  className="px-3 py-1.5 flex items-center gap-1 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-xs hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-sm"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => onDelete(cat._id)}
                  className="px-3 py-1.5 flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-xs hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-sm"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3 p-3">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white border rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition"
          >
            <div>
              <span className="text-xs font-semibold text-gray-500">
                Name:
              </span>
              <p className="text-gray-800 font-medium">{cat.name}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">
                Description:
              </span>
              <p className="text-gray-600">{cat.description || "—"}</p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onEdit(cat)}
                className="flex-1 px-3 py-1.5 flex items-center justify-center gap-1 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-xs hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-sm"
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                onClick={() => onDelete(cat._id)}
                className="flex-1 px-3 py-1.5 flex items-center justify-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-xs hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-sm"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
