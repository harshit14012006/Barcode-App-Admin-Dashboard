import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tag, FileText, Search, LayoutGrid, Table } from "lucide-react";
import axios from "axios";
import CategoryCardView from "../components/categories/CategoryCardView";
import CategoryTableView from "../components/categories/CategoryTableView";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://barcode-app-admin-dashboard.onrender.com/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");

      if (isEditing) {
        await axios.put(`https://barcode-app-admin-dashboard.onrender.com/api/categories/${editId}`, {
          name,
          description,
        });
        setMessage("Category updated successfully!");
      } else {
        await axios.post("https://barcode-app-admin-dashboard.onrender.com/api/categories", {
          name,
          description,
        });
        setMessage("Category added successfully!");
      }

      setName("");
      setDescription("");
      setIsEditing(false);
      setEditId(null);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.error || "Error saving category");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`https://barcode-app-admin-dashboard.onrender.com/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      alert("Error deleting category");
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setDescription(cat.description);
    setIsEditing(true);
    setEditId(cat._id);
  };

  const handleCancelEdit = () => {
    setName("");
    setDescription("");
    setIsEditing(false);
    setEditId(null);
  };

  useEffect(() => {
    if (!message && !error) return;
    const timer = setTimeout(() => {
      setMessage("");
      setError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, error]);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* Heading */}
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-500 to-orange-400 bg-clip-text text-transparent">
          {isEditing ? "Edit Category" : "Add New Category"}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-1 text-center">
          Manage your product categories with ease.
        </p>
      </div>

      {/* Messages */}
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 text-sm text-green-600 text-center font-medium"
        >
          {message}
        </motion.p>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 text-sm text-red-600 text-center font-medium"
        >
          {error}
        </motion.p>
      )}

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg"
      >
        {/* Category Name */}
        <InputField
          label="Category Name"
          icon={<Tag className="w-4 h-4 text-gray-400 mr-2" />}
          type="text"
          value={name}
          onChange={setName}
          placeholder="Enter category name"
          required
        />

        {/* Description */}
        <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col sm:col-span-2">
          <label className="text-gray-700 text-sm font-medium mb-1">Description</label>
          <div className="flex items-start px-3 py-2 border border-gray-300 rounded-xl bg-white/80 shadow-sm focus-within:ring-2 focus-within:ring-green-400 transition">
            <FileText className="w-4 h-4 text-gray-400 mr-2 mt-1" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
              rows="2"
              className="w-full outline-none text-sm resize-none bg-transparent"
            />
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="sm:col-span-2 flex flex-col sm:flex-row gap-3"
        >
          <button
            type="submit"
            className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-orange-400 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            {isEditing ? "Update Category" : "Add Category"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-300 text-gray-800 font-semibold shadow-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </motion.div>
      </motion.form>

      {/* Search & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        {/* 🔍 Search Box */}
        <div className="flex items-center px-3 py-2 border rounded-xl bg-white/80 shadow-sm w-full sm:w-1/3 focus-within:ring-2 focus-within:ring-green-400 transition">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm bg-transparent text-gray-700"
          />
        </div>

        {/* 🪪 Card / 📊 Table Toggle */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 rounded-xl text-sm font-medium shadow transition-all duration-300 ${viewMode === "card"
                ? "bg-gradient-to-r from-green-500 to-orange-400 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            🪪 Card View
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded-xl text-sm font-medium shadow transition-all duration-300 ${viewMode === "table"
                ? "bg-gradient-to-r from-green-500 to-orange-400 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            📊 Table View
          </button>
        </div>
      </div>

      {/* List */}
      {viewMode === "card" ? (
        <CategoryCardView categories={filteredCategories} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <CategoryTableView categories={filteredCategories} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </motion.div>
  );
}

/* Reusable InputField */
function InputField({ label, icon, type, value, onChange, placeholder, required }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col">
      <label className="text-gray-700 text-sm font-medium mb-1">{label}</label>
      <div className="flex items-center px-3 py-2 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm focus-within:ring-2 focus-within:ring-green-400 shadow-sm transition">
        {icon}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className="w-full outline-none text-gray-800 text-sm placeholder-gray-400 bg-transparent"
        />
      </div>
    </motion.div>
  );
}

/* Reusable ToggleButton */
function ToggleButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium shadow-md transition ${active
          ? "bg-gradient-to-r from-green-500 to-orange-400 text-white shadow-lg"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
