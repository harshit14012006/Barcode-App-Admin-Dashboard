import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ChevronDown, Shield, UserPlus } from "lucide-react";
import axios from "axios";

export default function StaffPage({ isSidebarCollapsed = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const roles = [
    { id: "staff", name: "Staff" },
    { id: "admin", name: "Admin" },
  ];

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
      setRole("");
    } catch (err) {
      setError(err.response?.data?.message || "Error registering user");
    }
  };

  // Auto-hide messages
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
      className="mx-auto mt-10 p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl max-w-full sm:max-w-3xl md:max-w-4xl"
    >
      {/* Heading */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 mb-2">
          <UserPlus className="text-green-500" size={28} />
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 to-orange-400 bg-clip-text text-transparent">
            Add New User
          </h2>
        </div>
        <p className="text-gray-600 text-sm md:text-base text-center">
          Create and assign roles for your team members.
        </p>
      </div>

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

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {/* Name Input */}
        <InputField
          label="Name"
          icon={<User className="w-4 h-4 text-gray-400 mr-2" />}
          type="text"
          value={name}
          onChange={setName}
          placeholder="Enter name"
          required
        />

        {/* Email Input */}
        <InputField
          label="Email"
          icon={<Mail className="w-4 h-4 text-gray-400 mr-2" />}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="example@dailycart.com"
          required
        />

        {/* Password Input */}
        <InputField
          label="Password"
          icon={<Lock className="w-4 h-4 text-gray-400 mr-2" />}
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          required
        />

        {/* Role Dropdown */}
        <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col relative">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Role
          </label>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-xl bg-white/80 shadow-sm cursor-pointer hover:border-green-400 transition"
          >
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 text-sm">
                {role || "Select role"}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {dropdownOpen && (
            <div className="absolute top-full mt-1 w-full bg-white/95 backdrop-blur-md border rounded-xl shadow-lg max-h-56 overflow-y-auto z-50">
              {roles.map((r) => (
                <div
                  key={r.id}
                  onClick={() => {
                    setRole(r.id);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-green-100 cursor-pointer transition"
                >
                  {r.name}
                </div>
              ))}
            </div>
          )}
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

/* Reusable InputField */
function InputField({ label, icon, type, value, onChange, placeholder, required }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col">
      <label className="block text-gray-700 text-sm font-medium mb-1">
        {label}
      </label>
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
