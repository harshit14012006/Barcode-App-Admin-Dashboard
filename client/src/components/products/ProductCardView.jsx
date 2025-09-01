// components/products/ProductCardView.jsx
import { Pencil, Trash2, Package, Tag, AlertTriangle, Calendar, CheckCircle, XCircle } from "lucide-react";

export default function ProductCardView({ products, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 text-lg truncate">{p.productName}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 truncate mt-1">
                <Tag size={14} className="text-gray-400" /> {p.barcode}
              </p>
            </div>
            {p.brand && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {p.brand}
              </span>
            )}
          </div>

          {/* Price + Stock */}
          <div className="mt-3 flex justify-between text-sm font-medium text-gray-700">
            <p className="flex items-center gap-1">
              <Package size={14} className="text-blue-500" /> {p.stockQuantity} in stock
            </p>
            <p className="text-gray-900 font-semibold">₹{p.price}</p>
          </div>

          {/* Category + Expiry */}
          <div className="mt-1 flex justify-between text-xs text-gray-600">
            <span className="capitalize">Category: {p.category}</span>
            {p.expiryDate && (
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-gray-400" />
                {new Date(p.expiryDate).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Description */}
          {p.description && (
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">{p.description}</p>
          )}

          {/* Reorder + Status */}
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-orange-600">
              <AlertTriangle size={14} /> Reorder: {p.reorderLevel}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 
                ${p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {p.isActive ? <CheckCircle size={14} /> : <XCircle size={14} />}
              {p.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => onEdit(p)}
              className="px-3 py-1.5 flex items-center gap-1 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 transition-shadow shadow-sm"
            >
              <Pencil size={14} /> Edit
            </button>
            <button
              onClick={() => onDelete(p._id)}
              className="px-3 py-1.5 flex items-center gap-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition-shadow shadow-sm"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
