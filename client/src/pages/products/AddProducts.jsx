// pages/AddProducts.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Tag,
  Barcode,
  DollarSign,
  Package,
  Calendar,
  Building2,
  FileText,
  Bell,
  ToggleLeft,
  ChevronDown,
} from "lucide-react";
import axios from "axios";

// 🔹 Custom Hook for outside click
function useOutsideClick(callback) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [callback]);
  return ref;
}

export default function AddProducts({ isSidebarCollapsed = false }) {
  const [productName, setProductName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔹 Ref for dropdown
  const dropdownRef = useOutsideClick(() => setDropdownOpen(false));

  // Fetch categories from DB
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");

      const res = await axios.post("http://localhost:5000/api/products/add", {
        productName,
        barcode,
        price,
        stockQuantity,
        category,
        expiryDate,
        brand,
        description,
        reorderLevel,
        isActive,
      });

      setMessage(res.data.message || "✅ Product added successfully!");
      setProductName("");
      setBarcode("");
      setPrice("");
      setStockQuantity("");
      setCategory("");
      setExpiryDate("");
      setBrand("");
      setDescription("");
      setReorderLevel("");
      setIsActive(true);
    } catch (err) {
      setError(err.response?.data?.message || "❌ Error adding product");
    }
  };

  // Auto hide messages
  useEffect(() => {
    if (!message && !error) return;
    const timer = setTimeout(() => {
      setMessage("");
      setError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, error]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, width: "100%" }}
      animate={{
        opacity: 1,
        y: 0,
        width: isSidebarCollapsed ? "100%" : "90%",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl max-w-full sm:max-w-3xl md:max-w-6xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add New Product
      </h2>

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

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {/* Product Name */}
        <Field
          label="Product Name"
          icon={<Tag className="w-4 h-4 text-gray-400 mr-2" />}
          value={productName}
          onChange={setProductName}
          placeholder="Enter product name"
          required
        />

        {/* Barcode */}
        <Field
          label="Barcode"
          icon={<Barcode className="w-4 h-4 text-gray-400 mr-2" />}
          value={barcode}
          onChange={setBarcode}
          placeholder="Scan / enter barcode"
          required
        />

        {/* Category Dropdown with Outside Click */}
        <motion.div
          ref={dropdownRef}
          whileHover={{ scale: 1.02 }}
          className="flex flex-col relative"
        >
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Category
          </label>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm cursor-pointer hover:border-green-400 transition"
          >
            <span className="text-gray-700 text-sm">
              {category || "Select category"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {dropdownOpen && (
            <div className="absolute top-full mt-1 w-full bg-white border rounded-xl shadow-lg max-h-56 overflow-y-auto z-50">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <div
                    key={cat._id}
                    onClick={() => {
                      setCategory(cat.name);
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-green-100 cursor-pointer transition"
                  >
                    {cat.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-400 text-sm">
                  No categories found
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Price */}
        <Field
          label="Price"
          icon={<DollarSign className="w-4 h-4 text-gray-400 mr-2" />}
          type="number"
          value={price}
          onChange={setPrice}
          placeholder="Enter price"
          required
        />

        {/* Stock Quantity */}
        <Field
          label="Stock Quantity"
          icon={<Package className="w-4 h-4 text-gray-400 mr-2" />}
          type="number"
          value={stockQuantity}
          onChange={setStockQuantity}
          placeholder="Enter stock"
          required
        />

        {/* Reorder Level */}
        <Field
          label="Reorder Level"
          icon={<Bell className="w-4 h-4 text-gray-400 mr-2" />}
          type="number"
          value={reorderLevel}
          onChange={setReorderLevel}
          placeholder="Enter minimum stock level"
        />

        {/* Brand */}
        <Field
          label="Brand"
          icon={<Building2 className="w-4 h-4 text-gray-400 mr-2" />}
          value={brand}
          onChange={setBrand}
          placeholder="Enter brand"
        />

        {/* Expiry Date */}
        <Field
          label="Expiry Date (optional)"
          icon={<Calendar className="w-4 h-4 text-gray-400 mr-2" />}
          type="date"
          value={expiryDate}
          onChange={setExpiryDate}
        />

        {/* Description */}
        <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col lg:col-span-3">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Description
          </label>
          <div className="flex items-start px-3 py-2 border border-gray-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-green-400 shadow-sm transition">
            <FileText className="w-4 h-4 text-gray-400 mr-2 mt-1" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              rows="3"
              className="w-full outline-none text-gray-800 text-sm placeholder-gray-400 resize-none"
            />
          </div>
        </motion.div>

        {/* Is Active */}
        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-3 lg:col-span-3">
          <ToggleLeft className="w-5 h-5 text-gray-500" />
          <label className="text-gray-700 text-sm font-medium">Active</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-5 h-5 accent-green-500 cursor-pointer"
          />
        </motion.div>

        {/* Submit */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="sm:col-span-2 lg:col-span-3">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-orange-400 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Add Product
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

/* Reusable Field */
function Field({ label, icon, type = "text", value, onChange, placeholder, required }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col">
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <div className="flex items-center px-3 py-2 border border-gray-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-green-400 shadow-sm transition">
        {icon}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className="w-full outline-none text-gray-800 text-sm placeholder-gray-400"
        />
      </div>
    </motion.div>
  );
}
