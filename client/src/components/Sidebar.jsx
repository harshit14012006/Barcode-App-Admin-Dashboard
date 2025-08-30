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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null); // null | 'staff' | 'products'
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
    { name: "Dashboard", icon: <Home size={20} className="text-blue-500" />, path: "/dashboard/admin" },
    { name: "Sales", icon: <DollarSign size={20} className="text-green-500" />, path: "/dashboard/admin/sales" },
    {
      name: "Products",
      icon: <Box size={20} className="text-orange-500" />,
      key: "products",
      subItems: [
        { name: "Add Product", path: "/dashboard/admin/products/add", icon: <UserPlus size={16} className="text-orange-400" /> },
        { name: "Manage Products", path: "/dashboard/admin/products/manage", icon: <Users size={16} className="text-yellow-400" /> },
      ],
    },
    { name: "Inventory Alerts", icon: <AlertTriangle size={20} className="text-red-500" />, path: "/dashboard/admin/inventory-alerts" },

    { type: "header", label: "Staff Management" },
    {
      name: "Staff",
      icon: <Users size={20} className="text-pink-500" />,
      key: "staff",
      subItems: [
        { name: "Add Staff", path: "/dashboard/admin/staff/add", icon: <UserPlus size={16} className="text-pink-400" /> },
        { name: "Manage Staff", path: "/dashboard/admin/staff/manage", icon: <Users size={16} className="text-purple-400" /> },
      ],
    },

    { type: "header", label: "Reports & Settings" },
    { name: "Reports", icon: <FileText size={20} className="text-teal-500" />, path: "/dashboard/admin/reports" },
    { name: "Settings", icon: <Settings size={20} className="text-gray-400" />, path: "/dashboard/admin/settings" },
  ];

  const activeClass = "bg-blue-600 text-white shadow-md";
  const inactiveClass = "text-gray-300 hover:bg-gray-800 hover:text-white";

  const renderMenu = (isMobile = false) =>
    menuItems.map((item, index) => {
      if (item.type === "header") {
        if (isCollapsed) return null;
        return (
          <div key={index} className="text-gray-400 text-xs font-semibold uppercase px-3 mt-3 mb-1">
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
              className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${isAnyActive ? activeClass : inactiveClass} hover:bg-gray-800`}
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

            {/* Expanded Sidebar */}
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
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition ${isActive ? activeClass : ""}`}
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
                <div className="bg-gray-800 rounded-md shadow-lg flex flex-col py-1">
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
                        className={`flex items-center gap-2 px-3 py-2 text-gray-200 hover:bg-gray-700 rounded transition ${isActive ? activeClass : ""}`}
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
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${isActive ? activeClass : inactiveClass}`}
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
        className="hidden md:flex flex-col bg-gray-900 text-white shadow-lg h-screen overflow-hidden"
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} className="text-blue-400" />
            {!isCollapsed && (
              <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl font-bold tracking-wide">
                DailyCart
              </motion.h1>
            )}
          </div>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded-lg hover:bg-gray-800 transition">
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">{renderMenu(false)}</nav>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div className="fixed inset-0 z-50 flex md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
            <motion.div
              className="relative w-64 bg-gray-900 text-white flex flex-col shadow-xl"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={22} className="text-blue-400" />
                  <h1 className="text-lg font-bold tracking-wide">DailyCart</h1>
                </div>
                <button onClick={() => setIsMobileOpen(false)} className="p-1 hover:bg-gray-800 rounded-lg transition">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 p-3 space-y-1">{renderMenu(true)}</nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
