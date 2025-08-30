// pages/ManageProducts.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import FiltersBar from "../components/products/FiltersBar";
import ProductCardView from "../components/products/ProductCardView";
import ProductTableView from "../components/products/ProductTableView";
import EditProductDrawer from "../components/products/EditProductDrawer";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("none");
  const [view, setView] = useState("card"); // card | table
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    barcode: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
  });

  // Fetch products
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

  // Filter & sort
  const filteredProducts = products.filter(
    (p) =>
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode.toLowerCase().includes(search.toLowerCase())) &&
      (categoryFilter === "all" || p.category === categoryFilter)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    return 0;
  });

  // Export CSV
  const exportToCSV = () => {
    const headers = ["Name", "Barcode", "Price", "Quantity", "Category"];
    const rows = products.map((p) => [p.name, p.barcode, p.price, p.quantity, p.category]);
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers, ...rows].map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "products.csv";
    link.click();
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      showToast("Product deleted successfully!");
    } catch {
      alert("Failed to delete product");
    }
  };

  // Open drawer
  const openEditDrawer = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      barcode: product.barcode,
      price: product.price,
      quantity: product.quantity,
      category: product.category || "",
      description: product.description || "",
    });
    setIsDrawerOpen(true);
  };

  // Toast helper
  const showToast = (message) => {
    setToastMsg(message);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 2500);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // Submit add/edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingProduct) {
        res = await axios.put(
          `http://localhost:5000/api/products/${editingProduct._id}`,
          formData
        );
        setProducts(products.map((p) => (p._id === res.data.product._id ? res.data.product : p)));
        showToast("Product updated successfully!");
      } else {
        res = await axios.post("http://localhost:5000/api/products", formData);
        setProducts([...products, res.data.product]);
        showToast("Product added successfully!");
      }
      setIsDrawerOpen(false);
      setEditingProduct(null);
      setFormData({
        name: "",
        barcode: "",
        price: "",
        quantity: "",
        category: "",
        description: "",
      });
    } catch {
      alert("Failed to save product");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">📦 Products</h2>
      <p className="mb-6 text-gray-600">Manage your products for barcode scanning with add, edit, delete & export features.</p>

      {/* Filters */}
      <FiltersBar
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        exportToCSV={exportToCSV}
      />

      {/* View toggle */}
      <div className="flex justify-end mb-6 gap-2">
        <button
          onClick={() => setView("card")}
          className={`px-4 py-2 rounded-lg shadow text-sm font-medium ${
            view === "card" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🪪 Card View
        </button>
        <button
          onClick={() => setView("table")}
          className={`px-4 py-2 rounded-lg shadow text-sm font-medium ${
            view === "table" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📊 Table View
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg text-center mb-6">
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
        !loading && !error && <p className="text-center text-gray-500">No products found</p>
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
          className={`fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-out ${
            isToastVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
          }`}
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
