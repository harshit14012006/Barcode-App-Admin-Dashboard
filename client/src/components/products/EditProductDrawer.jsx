// components/products/EditProductDrawer.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

export default function EditProductDrawer({ isOpen, onClose, formData, setFormData, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => setFormData({ ...formData, [field]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(e);
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl p-8 overflow-y-auto rounded-l-2xl border-l border-gray-200"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Edit Product</h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {["name", "barcode", "price", "quantity", "category", "description"].map((field) => (
                <div key={field} className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    type={field === "price" || field === "quantity" ? "number" : "text"}
                    value={formData[field] || ""}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={`Enter ${field}`}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              ))}

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
