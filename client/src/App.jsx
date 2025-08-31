// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageStaff from "./pages/users/ManageStaff";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import StaffPage from "./pages/users/StaffPage";
import StaffDashboard from "./pages/StaffDashboard"; 
import ManageProducts from "./pages/products/ManageProducts";
import AddProducts from "./pages/products/AddProducts";
import AddCategory from "./pages/AddCategory";

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop collapse
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile drawer

  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard routes */}
        <Route
          path="/dashboard/*"
          element={
            <div className="flex h-screen">
              {/* Sidebar with gradient hover effects */}
              <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              />

              {/* Main content */}
              <div className="flex-1 flex flex-col">
                {/* Navbar with animated gradient hover */}
                <Navbar setIsMobileOpen={setIsMobileOpen} />

                {/* Page content */}
                <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
                  <Routes>
                    {/* 🟢 Admin Routes */}
                    <Route
                      path="admin"
                      element={
                        <ProtectedRoute role="admin">
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="admin/products/add"
                      element={
                        <ProtectedRoute role="admin">
                          <AddProducts />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="admin/products/manage"
                      element={
                        <ProtectedRoute role="admin">
                          <ManageProducts />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="admin/products/category/add"
                      element={
                        <ProtectedRoute role="admin">
                          <AddCategory />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="admin/staff/add"
                      element={
                        <ProtectedRoute role="admin">
                          <StaffPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="admin/staff/manage"
                      element={
                        <ProtectedRoute role="admin">
                          <ManageStaff />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="admin/settings"
                      element={
                        <ProtectedRoute role="admin">
                          <Settings />
                        </ProtectedRoute>
                      }
                    />

                    {/* 🔵 Staff Routes */}
                    <Route
                      path="staff"
                      element={
                        <ProtectedRoute role="staff">
                          <StaffDashboard />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
