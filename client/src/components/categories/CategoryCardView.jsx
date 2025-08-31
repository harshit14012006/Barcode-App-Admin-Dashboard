// src/components/categories/CategoryCardView.jsx
import { Pencil, Trash2 } from "lucide-react";

export default function CategoryCardView({ categories, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <div
          key={cat._id}
          className="bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Title + Description */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {cat.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onEdit(cat)}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white text-sm hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-sm"
            >
              <Pencil size={16} /> Edit
            </button>
            <button
              onClick={() => onDelete(cat._id)}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-sm"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
