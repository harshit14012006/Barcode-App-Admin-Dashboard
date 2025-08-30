// page/StaffPage.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import axios from "axios";

export default function StaffPage({ isSidebarCollapsed = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");

      const res = await axios.post("http://localhost:5000/api/user/register", {
        name,
        email,
        password,
        role,
      });

      setMessage(res.data.message || "User registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setRole("staff");
    } catch (err) {
      setError(err.response?.data?.message || "Error registering user");
    }
  };

  // Message auto hide
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
      className="mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl max-w-full sm:max-w-3xl md:max-w-4xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add New User
      </h2>

      {/* Success & Error Messages */}
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
        {/* Name Input */}
        <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Name
          </label>
          <div className="flex items-center px-3 py-2 border border-gray-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-400 shadow-sm transition">
            <User className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter name"
              className="w-full outline-none text-gray-800 text-sm placeholder-gray-400"
            />
          </div>
        </motion.div>

        {/* Email Input */}
        <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <div className="flex items-center px-3 py-2 border border-gray-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-400 shadow-sm transition">
            <Mail className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@dailycart.com"
              className="w-full outline-none text-gray-800 text-sm placeholder-gray-400"
            />
          </div>
        </motion.div>

        {/* Password Input */}
        <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Password
          </label>
          <div className="flex items-center px-3 py-2 border border-gray-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-400 shadow-sm transition">
            <Lock className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full outline-none text-gray-800 text-sm placeholder-gray-400"
            />
          </div>
        </motion.div>

        {/* Role Select */}
        <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Role
          </label>
          <div className="relative flex items-center px-3 py-2 border border-gray-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-400 shadow-sm transition">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full outline-none text-gray-800 text-sm appearance-none bg-white pr-8 py-1 cursor-pointer"
            >
              <option value="staff">staff</option>
              <option value="admin">Admin</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="sm:col-span-2 lg:col-span-3"
        >
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-orange-400 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Add User
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
