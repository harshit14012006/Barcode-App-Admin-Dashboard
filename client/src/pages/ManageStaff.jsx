// pages/ManageStaff.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import FiltersBar from "../components/users/FiltersBar";
import UserCardView from "../components/users/UserCardView";
import UserTableView from "../components/users/UserTableView";
import EditUserDrawer from "../components/users/EditUserDrawer";

export default function ManageStaff() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortOption, setSortOption] = useState("none");
  const [view, setView] = useState("card");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Toast
  const [toastMsg, setToastMsg] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "staff" });

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/user");
        setUsers(data);
      } catch {
        setError("⚠️ Failed to fetch users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter & sort
  const filteredUsers = users.filter(
    user =>
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
       user.email.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter === "all" || user.role === roleFilter)
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    if (sortOption === "role") return a.role.localeCompare(b.role);
    return 0;
  });

  // Export CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Role"];
    const rows = users.map(u => [u.name, u.email, u.role]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "users.csv";
    link.click();
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      setUsers(users.filter(u => u._id !== id));
      showToast("User deleted successfully!");
    } catch {
      alert("Failed to delete user");
    }
  };

  // Open drawer
  const openEditDrawer = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, password: "", role: user.role });
    setIsDrawerOpen(true);
  };

  // Toast helper
  const showToast = (msg) => {
    setToastMsg(msg);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 2500);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    let dataToSend = { ...formData };
    if (!dataToSend.password) delete dataToSend.password;

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/user/${editingUser._id}`,
        dataToSend
      );
      setUsers(users.map(u => (u._id === data.user._id ? data.user : u)));
      setIsDrawerOpen(false);
      setEditingUser(null);
      showToast("Staff updated successfully!");
    } catch {
      alert("Failed to update user");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">👥 Users</h2>
      <p className="mb-6 text-gray-600">
        Manage staff and admins easily with search, filters, export, edit & delete.
      </p>

      <FiltersBar
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        exportToCSV={exportToCSV}
      />

      <div className="flex justify-end mb-6 gap-2">
        <button
          onClick={() => setView("card")}
          className={`px-4 py-2 rounded-lg shadow text-sm font-medium ${
            view === "card" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >🪪 Card View</button>
        <button
          onClick={() => setView("table")}
          className={`px-4 py-2 rounded-lg shadow text-sm font-medium ${
            view === "table" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >📊 Table View</button>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg text-center mb-6">
          {error}
        </div>
      )}

      {!loading && !error && sortedUsers.length > 0 ? (
        view === "card" ? (
          <UserCardView users={sortedUsers} onEdit={openEditDrawer} onDelete={deleteUser} />
        ) : (
          <UserTableView users={sortedUsers} onEdit={openEditDrawer} onDelete={deleteUser} />
        )
      ) : (
        !loading && !error && <p className="text-center text-gray-500">No users found</p>
      )}

      <EditUserDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleEditSubmit}
      />

      {toastMsg && (
        <div className={`fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-out
          ${isToastVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}>
          {toastMsg}
        </div>
      )}
    </div>
  );
}
