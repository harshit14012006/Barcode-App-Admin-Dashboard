// pages/ManageProducts.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import FiltersBar from "../../components/products/FiltersBar";
import ProductCardView from "../../components/products/ProductCardView";
import ProductTableView from "../../components/products/ProductTableView";
import EditProductDrawer from "../../components/products/EditProductDrawer";
import { Package } from "lucide-react";
import { motion } from "framer-motion";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("none");
  const [view, setView] = useState("card");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Toast
  const [toastMsg, setToastMsg] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    barcode: "",
    price: "",
    stockQuantity: "",
    category: "",
    brand: "",
    expiryDate: "",
    description: "",
    reorderLevel: "",
    isActive: true,
  });

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
      } catch {
        setError("⚠️ Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filter & sort
  const filteredProducts = products.filter(
    (p) =>
      (p.productName.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode.toLowerCase().includes(search.toLowerCase())) &&
      (categoryFilter === "all" || p.category === categoryFilter)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "name-asc") return a.productName.localeCompare(b.productName);
    if (sortOption === "name-desc") return b.productName.localeCompare(a.productName);
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    return 0;
  });

  // ✅ Export CSV
  const exportToCSV = () => {
    const headers = ["Product Name", "Barcode", "Price", "Stock Quantity", "Category"];
    const rows = products.map((p) => [
      p.productName,
      p.barcode,
      p.price,
      p.stockQuantity,
      p.category,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers, ...rows].map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "products.csv";
    link.click();
  };

  // ✅ Delete product
  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      showToast("✅ Product deleted successfully!");
    } catch {
      alert("Failed to delete product");
    }
  };

  // ✅ Open drawer
  const openEditDrawer = (product) => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName,
      barcode: product.barcode,
      price: product.price,
      stockQuantity: product.stockQuantity,
      category: product.category || "",
      brand: product.brand || "",
      expiryDate: product.expiryDate ? product.expiryDate.split("T")[0] : "",
      description: product.description || "",
      reorderLevel: product.reorderLevel || 5,
      isActive: product.isActive ?? true,
    });
    setIsDrawerOpen(true);
  };

  // ✅ Toast
  const showToast = (msg) => {
    setToastMsg(msg);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 2500);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // ✅ Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingProduct) {
        res = await axios.put(
          `http://localhost:5000/api/products/${editingProduct._id}`,
          formData
        );
        setProducts(products.map((p) => (p._id === res.data._id ? res.data : p)));
        showToast("✅ Product updated successfully!");
      } else {
        res = await axios.post("http://localhost:5000/api/products", formData);
        setProducts([...products, res.data]);
        showToast("✅ Product added successfully!");
      }
      setIsDrawerOpen(false);
      setEditingProduct(null);
      setFormData({
        productName: "",
        barcode: "",
        price: "",
        stockQuantity: "",
        category: "",
        brand: "",
        expiryDate: "",
        description: "",
        reorderLevel: "",
        isActive: true,
      });
    } catch {
      alert("Failed to save product");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mb-2">
          <Package className="text-blue-500" size={28} />
          <span className="bg-gradient-to-r from-green-500 to-orange-400 bg-clip-text text-transparent">
            Manage Products
          </span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Manage your{" "}
          <span className="text-blue-600 font-semibold">inventory & barcoded items</span>{" "}
          with add, edit, delete & export options.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4"
      >
        <FiltersBar
          search={search}
          setSearch={setSearch}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
          exportToCSV={exportToCSV}
        />
      </motion.div>

      {/* View Switcher */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setView("card")}
          className={`px-4 py-2 rounded-xl text-sm font-medium shadow transition-all duration-300 ${view === "card"
            ? "bg-gradient-to-r from-green-500 to-orange-400 text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          🪪 Card View
        </button>
        <button
          onClick={() => setView("table")}
          className={`px-4 py-2 rounded-xl text-sm font-medium shadow transition-all duration-300 ${view === "table"
              ? "bg-gradient-to-r from-green-500 to-orange-400 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          📊 Table View
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center py-10">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-xl text-center shadow-sm">
          {error}
        </div>
      )}

      {/* Product list */}
      {!loading && !error && sortedProducts.length > 0 ? (
        view === "card" ? (
          <ProductCardView products={sortedProducts} onEdit={openEditDrawer} onDelete={deleteProduct} />
        ) : (
          <ProductTableView products={sortedProducts} onEdit={openEditDrawer} onDelete={deleteProduct} />
        )
      ) : (
        !loading && !error && <p className="text-center text-gray-400 italic">No products found.</p>
      )}

      {/* Drawer */}
      <EditProductDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleEditSubmit}
      />

      {/* Toast */}
      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-3 rounded-xl shadow-lg transform transition-all duration-500 ease-out ${isToastVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
            }`}
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
