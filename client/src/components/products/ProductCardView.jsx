// components/products/ProductCardView.jsx
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

export default function ProductCardView({ products, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <motion.div
          key={p._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <h4 className="text-lg font-semibold text-gray-800">{p.name}</h4>
          <p className="text-gray-500">Barcode: {p.barcode}</p>
          <p className="text-gray-500">Price: ${p.price}</p>
          <p className="text-gray-500">Quantity: {p.quantity}</p>
          {p.category && <p className="text-gray-500">Category: {p.category}</p>}
          <p className="text-gray-400 text-sm">{p.description}</p>

          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => onEdit(p)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
            >
              <Pencil size={16} /> Edit
            </button>
            <button
              onClick={() => onDelete(p._id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
