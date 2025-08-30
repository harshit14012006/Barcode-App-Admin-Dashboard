// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageStaff from "./pages/ManageStaff";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import StaffPage from "./pages/StaffPage";
import StaffDashboard from "./pages/StaffDashboard"; // ✅ Staff Dashboar
import ManageProducts from "./pages/ManageProducts";

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop collapse
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile drawer

  return (
    <Router>
      <Routes>
        {/* Login bina sidebar */}
        <Route path="/" element={<Login />} />

        {/* Dashboard routes with Sidebar + Navbar */}
        <Route
          path="/dashboard/*"
          element={
            <div className="flex h-screen">
              {/* Sidebar */}
              <Sidebar
                isCollapsed={isCollapsed}
                isMobileOpen={isMobileOpen}
                setIsCollapsed={setIsCollapsed}
                setIsMobileOpen={setIsMobileOpen}
              />

              {/* Main content */}
              <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <Navbar setIsMobileOpen={setIsMobileOpen} />

                {/* Page Content */}
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
                      path="admin/staff/manage"
                      element={
                        <ProtectedRoute role="admin">
                          <ManageStaff />
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
                      path="admin/products/manage"
                      element={
                        <ProtectedRoute role="admin">
                          <ManageProducts />
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
