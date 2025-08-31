// components/users/EditUserDrawer.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

export default function EditUserDrawer({ isOpen, onClose, formData, setFormData, onSubmit }) {
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
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 35 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white/90 backdrop-blur-xl shadow-2xl p-5 sm:p-8 overflow-y-auto rounded-l-2xl border-l border-gray-200"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                Edit User Profile
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-transform duration-300 hover:scale-110"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {Object.keys(formData).map((field) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * Object.keys(formData).indexOf(field) }}
                  className="space-y-2"
                >
                  <label className="text-base sm:text-sm font-medium text-gray-700 capitalize tracking-wide">
                    {field}
                  </label>

                  {field === "role" ? (
                    <select
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
                    >
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : field === "password" ? (
                    <input
                      type="password"
                      value={formData[field] || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
                      placeholder="Enter new password"
                    />
                  ) : (
                    <input
                      type="text"
                      value={formData[field] || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  )}
                </motion.div>
              ))}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 hover:shadow-lg transition duration-300"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-green-600 to-orange-500 text-white rounded-xl hover:from-green-700 hover:to-orange-600 hover:shadow-lg transition duration-300 flex items-center justify-center gap-2"
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
