// components/products/ProductTableView.jsx
import { Pencil, Trash2 } from "lucide-react";

export default function ProductTableView({ products, onEdit, onDelete, isSidebarCollapsed }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No products available.
      </div>
    );
  }

  return (
    <div className="w-full max-w-full">
      {/* Desktop Table */}
      <div className="hidden md:block mx-auto max-w-[920px] lg:max-w-[920px]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {[
                  "Product Name",
                  "Barcode",
                  "Price",
                  "Stock Qty",
                  "Category",
                  "Expiry Date",
                  "Brand",
                  "Description",
                  "Reorder Level",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => (
                <tr
                  key={p._id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-50 transition`}
                >
                  <td className="px-6 py-3 font-medium text-gray-800 truncate max-w-[180px]">
                    {p.productName}
                  </td>
                  <td className="px-6 py-3 text-gray-600 truncate max-w-[140px]">{p.barcode}</td>
                  <td className="px-6 py-3 text-gray-600">₹{p.price}</td>
                  <td className="px-6 py-3 text-gray-600">{p.stockQuantity}</td>
                  <td className="px-6 py-3 text-gray-600">{p.category}</td>
                  <td className="px-6 py-3 text-gray-600">
                    {p.expiryDate ? new Date(p.expiryDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{p.brand || "-"}</td>
                  <td className="px-6 py-3 text-gray-600 max-w-[220px] truncate">
                    {p.description || "-"}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{p.reorderLevel}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-3 flex gap-2">
                    <button
                      onClick={() => onEdit(p)}
                      className="px-3 py-1.5 flex items-center gap-1 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-xs hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-sm"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                    <button
                      onClick={() => onDelete(p._id)}
                      className="px-3 py-1.5 flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-xs hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 p-3">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white border rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition"
          >
            <div>
              <span className="text-xs font-semibold text-gray-500">Name:</span>
              <p className="text-gray-800 font-medium">{p.productName}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Barcode:</span>
              <p className="text-gray-600">{p.barcode}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Price:</span>
              <p className="text-gray-600">₹{p.price}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Stock Qty:</span>
              <p className="text-gray-600">{p.stockQuantity}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Category:</span>
              <p className="text-gray-600">{p.category}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Expiry Date:</span>
              <p className="text-gray-600">{p.expiryDate ? new Date(p.expiryDate).toLocaleDateString() : "-"}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Brand:</span>
              <p className="text-gray-600">{p.brand || "-"}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Description:</span>
              <p className="text-gray-600 truncate">{p.description || "-"}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Reorder Level:</span>
              <p className="text-gray-600">{p.reorderLevel}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Status:</span>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                  p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {p.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onEdit(p)}
                className="flex-1 px-3 py-1.5 flex items-center justify-center gap-1 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 transition shadow-sm"
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                onClick={() => onDelete(p._id)}
                className="flex-1 px-3 py-1.5 flex items-center justify-center gap-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition shadow-sm"
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
