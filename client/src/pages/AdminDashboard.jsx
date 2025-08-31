import { BarChart3, Users, ShoppingBag, Package, DollarSign, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function AdminDashboard() {
  // Dummy sales data
  const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 18500 },
    { month: "Mar", sales: 15000 },
    { month: "Apr", sales: 21000 },
    { month: "May", sales: 18000 },
    { month: "Jun", sales: 24000 },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Page Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
          <BarChart3 className="text-green-500" size={28} />
          <span className="bg-gradient-to-r from-green-500 to-orange-400 bg-clip-text text-transparent">
            Admin Dashboard
          </span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Welcome back, Admin 👋. Here’s an overview of your platform.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-5 flex items-center gap-4 hover:shadow-2xl transition"
        >
          <div className="p-3 rounded-xl bg-green-100 text-green-600">
            <Users size={26} />
          </div>
          <div>
            <h4 className="text-lg font-semibold">1,250</h4>
            <p className="text-gray-500 text-sm">Total Users</p>
          </div>
        </motion.div>

        {/* Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-5 flex items-center gap-4 hover:shadow-2xl transition"
        >
          <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
            <ShoppingBag size={26} />
          </div>
          <div>
            <h4 className="text-lg font-semibold">320</h4>
            <p className="text-gray-500 text-sm">Orders Today</p>
          </div>
        </motion.div>

        {/* Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-5 flex items-center gap-4 hover:shadow-2xl transition"
        >
          <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
            <Package size={26} />
          </div>
          <div>
            <h4 className="text-lg font-semibold">480</h4>
            <p className="text-gray-500 text-sm">Products</p>
          </div>
        </motion.div>

        {/* Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-5 flex items-center gap-4 hover:shadow-2xl transition"
        >
          <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
            <DollarSign size={26} />
          </div>
          <div>
            <h4 className="text-lg font-semibold">₹2,45,000</h4>
            <p className="text-gray-500 text-sm">Revenue</p>
          </div>
        </motion.div>
      </div>

      {/* Sales Overview Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-blue-600" size={24} />
          <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Sales Overview
          </h3>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid #e5e7eb" }} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="url(#colorSales)"
              strokeWidth={3}
              dot={{ r: 5, fill: "#22c55e" }}
              activeDot={{ r: 8 }}
            />
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
