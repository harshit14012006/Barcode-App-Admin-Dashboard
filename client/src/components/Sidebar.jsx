import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  DollarSign,
  Box,
  FileText,
  AlertTriangle,
  UserPlus,
  ClipboardList,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null);
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const floatingRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (floatingRef.current && !floatingRef.current.contains(event.target)) {
        setIsFloatingOpen(false);
        setExpandedItem(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { type: "header", label: "Operations" },
    { name: "Dashboard", icon: <Home size={20} className="text-green-600" />, path: "/dashboard/admin" },
    { name: "Sales Overview", icon: <DollarSign size={20} className="text-orange-500" />, path: "/dashboard/admin/sales" },
    {
      name: "Products & Inventory",
      icon: <Box size={20} className="text-orange-600" />,
      key: "products",
      subItems: [
        { name: "New Product", path: "/dashboard/admin/products/add", icon: <UserPlus size={16} className="text-orange-400" /> },
        { name: "Product Catalog", path: "/dashboard/admin/products/manage", icon: <ClipboardList size={16} className="text-yellow-500" /> },
        { name: "Categories", path: "/dashboard/admin/products/category/add", icon: <FileText size={16} className="text-green-400" /> },
      ],
    },
    { name: "Stock Alerts", icon: <AlertTriangle size={20} className="text-red-600" />, path: "/dashboard/admin/inventory-alerts" },

    { type: "header", label: "Staff Management" },
    {
      name: "Team Management",
      icon: <Users size={20} className="text-blue-600" />,
      key: "staff",
      subItems: [
        { name: "New Staff Member", path: "/dashboard/admin/staff/add", icon: <UserPlus size={16} className="text-pink-400" /> },
        { name: "Staff Directory", path: "/dashboard/admin/staff/manage", icon: <Users size={16} className="text-purple-400" /> },
      ],
    },

    { type: "header", label: "Reports & Settings" },
    { name: "Analytics & Reports", icon: <FileText size={20} className="text-teal-600" />, path: "/dashboard/admin/reports" },
    { name: "System Settings", icon: <Settings size={20} className="text-gray-500" />, path: "/dashboard/admin/settings" },
  ];

  const activeClass = "bg-gradient-to-r from-green-500 to-orange-400 text-white shadow-md";
  const inactiveClass = "text-gray-700 transition-colors duration-300";

  const renderMenu = (isMobile = false) =>
    menuItems.map((item, index) => {
      if (item.type === "header") {
        if (isCollapsed) return null;
        return (
          <div key={index} className="text-gray-500 text-xs font-semibold uppercase px-3 mt-3 mb-1">
            {item.label}
          </div>
        );
      }

      if (item.subItems) {
        const isAnyActive = item.subItems.some((sub) => location.pathname === sub.path);

        return (
          <div key={item.name} className="relative">
            <div
              onClick={() => {
                if (!isCollapsed) {
                  setExpandedItem(expandedItem === item.key ? null : item.key);
                } else {
                  setExpandedItem(expandedItem === item.key ? null : item.key);
                  setIsFloatingOpen(expandedItem === item.key ? false : true);
                }
              }}
              className={`flex items-center justify-between gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 ${isAnyActive ? activeClass : inactiveClass} hover:shadow-lg hover:bg-gradient-to-r hover:from-green-400 hover:to-orange-300`}
            >
              <div className="flex items-center gap-3">
                {React.cloneElement(item.icon, { className: isAnyActive ? "text-white" : item.icon.props.className })}
                {!isCollapsed && <span className="font-medium">{item.name}</span>}
              </div>
              {!isCollapsed && item.key && (
                <motion.div animate={{ rotate: expandedItem === item.key ? 90 : 0 }} className="transition-transform">
                  <ChevronRight />
                </motion.div>
              )}
            </div>

            {/* Expanded SubItems */}
            <AnimatePresence>
              {expandedItem === item.key && !isCollapsed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-col pl-6 mt-1 space-y-1"
                >
                  {item.subItems.map((sub) => {
                    const isActive = location.pathname === sub.path;
                    return (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={isMobile ? () => setIsMobileOpen(false) : undefined}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl ${isActive ? activeClass : inactiveClass} hover:shadow-lg hover:bg-gradient-to-r hover:from-green-400 hover:to-orange-300 transition-all duration-500`}
                      >
                        {React.cloneElement(sub.icon, { className: isActive ? "text-white" : sub.icon.props.className })}
                        <span className="font-medium">{sub.name}</span>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Panel for Collapsed Sidebar */}
            {isCollapsed && expandedItem === item.key && isFloatingOpen && (
              <motion.div
                ref={floatingRef}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="fixed z-50"
                style={{
                  top: floatingRef.current ? floatingRef.current.getBoundingClientRect().top : 100,
                  left: 80,
                  width: 200,
                }}
              >
                <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex flex-col py-1">
                  {item.subItems.map((sub) => {
                    const isActive = location.pathname === sub.path;
                    return (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={() => {
                          setIsFloatingOpen(false);
                          setExpandedItem(null);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl ${isActive ? activeClass : inactiveClass} hover:shadow-lg hover:bg-gradient-to-r hover:from-green-400 hover:to-orange-300 transition-all duration-500`}
                      >
                        {React.cloneElement(sub.icon, { className: isActive ? "text-white" : sub.icon.props.className })}
                        <span className="font-medium">{sub.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        );
      }

      const isActive = location.pathname === item.path;
      return (
        <Link
          key={item.name}
          to={item.path}
          onClick={isMobile ? () => setIsMobileOpen(false) : undefined}
          className={`flex items-center gap-3 px-3 py-2 rounded-xl ${isActive ? activeClass : inactiveClass} hover:shadow-lg hover:bg-gradient-to-r hover:from-green-400 hover:to-orange-300 transition-all duration-500`}
        >
          {React.cloneElement(item.icon, { className: isActive ? "text-white" : item.icon.props.className })}
          {!isCollapsed && <span className="font-medium">{item.name}</span>}
        </Link>
      );
    });

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        className="hidden md:flex flex-col bg-white/90 backdrop-blur-md text-gray-800 shadow-lg h-screen overflow-hidden rounded-r-2xl"
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} className="text-green-600" />
            {!isCollapsed && (
              <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl font-bold tracking-wide text-gray-800">
                DailyCart
              </motion.h1>
            )}
          </div>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded-lg hover:bg-green-100 transition">
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">{renderMenu(false)}</nav>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div className="fixed inset-0 z-50 flex md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
            <motion.div
              className="relative w-64 bg-white/90 backdrop-blur-md text-gray-800 flex flex-col shadow-xl rounded-r-2xl"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={22} className="text-green-600" />
                  <h1 className="text-lg font-bold tracking-wide text-gray-800">DailyCart</h1>
                </div>
                <button onClick={() => setIsMobileOpen(false)} className="p-1 hover:bg-green-100 rounded-lg transition">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">{renderMenu(true)}</nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
