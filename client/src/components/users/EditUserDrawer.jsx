// components/users/EditUserDrawer.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function EditUserDrawer({ isOpen, onClose, formData, setFormData, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => setFormData({ ...formData, [field]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(e); // make sure onSubmit handles event properly
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
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900/80 to-gray-700/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white/80 backdrop-blur-lg shadow-2xl p-8 overflow-y-auto rounded-l-2xl border-l border-gray-200/50"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Edit User Profile
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100/50 hover:bg-gray-200/70 transition-transform duration-300 hover:scale-110"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.keys(formData).map((field) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * Object.keys(formData).indexOf(field) }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-700 capitalize tracking-wide">
                    {field}
                  </label>

                  {field === "role" ? (
                    <select
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 shadow-sm hover:shadow-md"
                    >
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : field === "password" ? (
                    <input
                      type="password"
                      value={formData[field] || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 shadow-sm hover:shadow-md"
                      placeholder="Enter new password"
                    />
                  ) : (
                    <input
                      type="text"
                      value={formData[field] || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 shadow-sm hover:shadow-md"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  )}
                </motion.div>
              ))}

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gray-100/70 text-gray-700 rounded-xl hover:bg-gray-200/90 hover:shadow-lg transition duration-300 transform hover:scale-105"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2"
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
                    'Save'
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
