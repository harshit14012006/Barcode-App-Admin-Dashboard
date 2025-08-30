// components/products/ProductTableView.jsx
import { Pencil, Trash2 } from "lucide-react";

export default function ProductTableView({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {["Name", "Barcode", "Price", "Quantity", "Category", "Actions"].map((h) => (
              <th key={h} className="px-4 py-2 text-left text-gray-600 font-medium text-sm">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.barcode}</td>
              <td className="px-4 py-2">${p.price}</td>
              <td className="px-4 py-2">{p.quantity}</td>
              <td className="px-4 py-2">{p.category}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => onEdit(p)}
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1 text-sm"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => onDelete(p._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1 text-sm"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
