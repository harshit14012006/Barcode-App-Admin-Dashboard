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
  ChevronDown,
  Search,
  ShoppingCart,
} from "lucide-react";
import axios from "axios";

function useOutsideClick(callback) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) callback();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [callback]);
  return ref;
}

function Field({
  label,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  error,
  autoFocus,
  inputRef,
}) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col">
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <div
        className={`flex items-center px-3 py-2 border rounded-xl bg-white/80 backdrop-blur-sm shadow-sm transition
          ${error ? "border-red-400 ring-1 ring-red-300" : "border-gray-300 focus-within:ring-2 focus-within:ring-green-400"}`}
      >
        {icon}
        <input
          type={type}
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full outline-none text-gray-800 text-sm placeholder-gray-400 bg-transparent"
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </motion.div>
  );
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
  const [categorySearch, setCategorySearch] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [inlineErrors, setInlineErrors] = useState({});

  const dropdownRef = useOutsideClick(() => setDropdownOpen(false));
  const barcodeRef = useRef(null);

  // ✅ Fetch categories from backend
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

  // ✅ Validate fields
  const validateFields = () => {
    const errs = {};
    if (!barcode) errs.barcode = "Barcode is required";
    if (!price || parseFloat(price) <= 0) errs.price = "Enter a valid price";
    return errs;
  };

  // ✅ Clear form after submit
  const clearForm = () => {
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
    setInlineErrors({});
  };

  // ✅ Handle Submit
  const handleSubmit = async (e, addAnother = false) => {
    e.preventDefault();
    const errs = validateFields();
    setInlineErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      setError("");
      setMessage("");

      // 🔗 Backend API call (your controller addProduct is used here)
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

      if (addAnother) {
        clearForm();
        setTimeout(() => {
          barcodeRef.current?.focus();
        }, 100);
      } else {
        clearForm();
      }
    } catch (err) {
      setError(err.response?.data?.message || "❌ Error adding product");
    }
  };

  // ✅ Auto-clear success/error after 3s
  useEffect(() => {
    if (!message && !error) return;
    const timer = setTimeout(() => {
      setMessage("");
      setError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, error]);

  // ✅ Filter categories
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mx-4 sm:mx-6 md:mx-10 mt-6 p-6 sm:p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl max-w-full"
    >
      {/* Heading */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingCart className="text-green-500" size={28} />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 to-orange-400 bg-clip-text text-transparent text-center">
            Add New Product
          </h2>
        </div>
        <p className="text-gray-600 text-sm sm:text-base text-center">
          Fill in details to add a product to your inventory.
        </p>
      </div>

      {/* Alerts */}
      {message && <p className="mb-4 text-sm text-green-600 text-center font-medium">{message}</p>}
      {error && <p className="mb-4 text-sm text-red-600 text-center font-medium">{error}</p>}

      {/* Form */}
      <motion.form
        onSubmit={(e) => handleSubmit(e, false)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        <Field label="Product Name" icon={<Tag className="w-4 h-4 text-gray-400 mr-2" />} value={productName} onChange={setProductName} placeholder="Enter product name" required autoFocus />
        <Field label="Barcode" icon={<Barcode className="w-4 h-4 text-gray-400 mr-2" />} value={barcode} onChange={setBarcode} placeholder="Scan / enter barcode" required error={inlineErrors.barcode} inputRef={barcodeRef} />

        {/* Category Dropdown with search */}
        <motion.div ref={dropdownRef} whileHover={{ scale: 1.02 }} className="flex flex-col relative mb-2 sm:mb-0 z-50">
          <label className="block text-gray-700 text-sm font-medium mb-1">Category</label>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-xl bg-white/80 shadow-sm cursor-pointer hover:border-green-400 transition"
          >
            <span className="text-gray-700 text-sm">{category || "Select category"}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </div>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white/95 backdrop-blur-md border rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
              <div className="flex items-center px-3 py-2 border-b">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search category..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full text-sm outline-none bg-transparent"
                />
              </div>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <div
                    key={cat._id}
                    onClick={() => {
                      setCategory(cat.name);
                      setDropdownOpen(false);
                      setCategorySearch("");
                    }}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-green-100 cursor-pointer transition"
                  >
                    {cat.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-400 text-sm">No categories found</div>
              )}
            </div>
          )}
        </motion.div>

        <Field label="Price" type="number" icon={<DollarSign className="w-4 h-4 text-gray-400 mr-2" />} value={price} onChange={setPrice} placeholder="Enter price" required error={inlineErrors.price} />
        <Field label="Stock Quantity" type="number" icon={<Package className="w-4 h-4 text-gray-400 mr-2" />} value={stockQuantity} onChange={setStockQuantity} placeholder="Enter stock" required />
        <Field label="Reorder Level" type="number" icon={<Bell className="w-4 h-4 text-gray-400 mr-2" />} value={reorderLevel} onChange={setReorderLevel} placeholder="Minimum stock level" />
        <Field label="Brand" icon={<Building2 className="w-4 h-4 text-gray-400 mr-2" />} value={brand} onChange={setBrand} placeholder="Enter brand" />
        <Field label="Expiry Date (optional)" type="date" icon={<Calendar className="w-4 h-4 text-gray-400 mr-2" />} value={expiryDate} onChange={setExpiryDate} />

        {/* Description */}
        <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col lg:col-span-3">
          <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
          <div className="flex items-start px-3 py-2 border border-gray-300 rounded-xl bg-white/80 shadow-sm focus-within:ring-2 focus-within:ring-green-400 transition">
            <FileText className="w-4 h-4 text-gray-400 mr-2 mt-1" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description" rows="3" className="w-full outline-none text-gray-800 text-sm placeholder-gray-400 resize-none bg-transparent" />
          </div>
        </motion.div>

        {/* Active Toggle with Status */}
        <motion.div whileHover={{ scale: 1.01 }} className="flex items-center justify-between lg:col-span-3 py-2">
          <span className="text-sm font-medium text-gray-700">Status</span>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-semibold ${isActive ? "text-green-600" : "text-gray-500"}`}>
              {isActive ? "Active" : "Inactive"}
            </span>
            <button
              onClick={() => setIsActive(!isActive)}
              type="button"
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isActive ? "bg-green-500" : "bg-gray-300"}`}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm"
                animate={{ x: isActive ? 24 : 0 }}
              />
            </button>
          </div>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:col-span-2 lg:col-span-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full sm:w-1/2 py-3 rounded-xl bg-gradient-to-r from-green-500 to-orange-400 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Add Product
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            className="w-full sm:w-1/2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Save & Add Another
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}
