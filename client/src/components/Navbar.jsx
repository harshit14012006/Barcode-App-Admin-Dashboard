import { Menu, Bell, ChevronDown, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setIsMobileOpen }) {
  const userName = localStorage.getItem("name") || "User";
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false); // Notifications dropdown state
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  const notifications = [
    { id: 1, message: "New user registered" },
    { id: 2, message: "Server backup completed" },
    { id: 3, message: "New order received" },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleKeyDown = (e, toggleFunc) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleFunc((prev) => !prev);
    } else if (e.key === "Escape") {
      toggleFunc(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 shadow-sm sticky top-0 z-30">
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="md:hidden p-2 rounded-lg hover:bg-gray-200/50 transition-all duration-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Toggle mobile menu"
      >
        <Menu size={24} />
      </motion.button>

      {/* Navbar Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate max-w-[50%] sm:max-w-[60%] md:max-w-[70%]"
      >
        Admin Panel
      </motion.h1>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-full hover:bg-gray-200/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`View notifications`}
            onClick={() => setIsNotifOpen((prev) => !prev)}
            onKeyDown={(e) => handleKeyDown(e, setIsNotifOpen)}
          >
            <Bell size={20} className="text-gray-600" />
            {notifications.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 block w-3 h-3 rounded-full bg-red-500 ring-2 ring-white"
              />
            )}
          </motion.button>

          {/* Notifications Dropdown */}
          {isNotifOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50"
            >
              <div className="p-2">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="px-4 py-2 text-gray-700 hover:bg-blue-50 rounded transition-colors duration-150 cursor-pointer text-sm"
                  >
                    {notif.message}
                  </div>
                ))}
                {notifications.length === 0 && (
                  <div className="px-4 py-2 text-gray-500 text-sm">No notifications</div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Welcome Text */}
        <span className="hidden sm:inline text-gray-700 text-sm md:text-base font-medium truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px]">
          Welcome, {userName}
        </span>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(59,130,246,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            onKeyDown={(e) => handleKeyDown(e, setIsProfileOpen)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm sm:text-base font-semibold shadow-md cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Toggle menu for ${userName}`}
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            {userName.charAt(0).toUpperCase()}
            <ChevronDown size={16} className="ml-1 text-white" />
          </motion.button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50"
            >
              <Link
                to="/dashboard/admin/settings"
                className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 text-sm font-medium"
                onClick={() => setIsProfileOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
                  isLoggingOut
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-600 hover:bg-red-50 hover:text-red-700"
                }`}
              >
                <LogOut size={16} />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
