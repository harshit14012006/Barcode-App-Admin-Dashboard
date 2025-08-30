import { Users, Settings, DollarSign, Package, AlertTriangle, BarChart3 } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Page Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
          <BarChart3 className="text-blue-600" size={28} />
          Admin Dashboard
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Welcome back, Admin 👋. Here’s an overview of your platform.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white shadow rounded-2xl p-4 flex items-center gap-3 md:gap-4">
          <DollarSign className="text-green-600" size={28} />
          <div>
            <p className="text-gray-500 text-xs md:text-sm">Daily Sales</p>
            <p className="text-lg md:text-xl font-bold">₹12,500</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-4 flex items-center gap-3 md:gap-4">
          <Users className="text-blue-600" size={28} />
          <div>
            <p className="text-gray-500 text-xs md:text-sm">Total Users</p>
            <p className="text-lg md:text-xl font-bold">145</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-4 flex items-center gap-3 md:gap-4">
          <Package className="text-purple-600" size={28} />
          <div>
            <p className="text-gray-500 text-xs md:text-sm">Products in Stock</p>
            <p className="text-lg md:text-xl font-bold">320</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-4 flex items-center gap-3 md:gap-4">
          <AlertTriangle className="text-red-600" size={28} />
          <div>
            <p className="text-gray-500 text-xs md:text-sm">Low Stock Alerts</p>
            <p className="text-lg md:text-xl font-bold">3</p>
          </div>
        </div>
      </div>

      {/* Recent Orders + User Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

        {/* Recent Orders */}
        <div className="bg-white shadow rounded-2xl p-4 md:p-5 overflow-x-auto">
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Recent Orders</h3>
          <table className="w-full text-sm md:text-base text-left min-w-[400px] md:min-w-full">
            <thead className="text-gray-600 border-b">
              <tr>
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td>#1001</td>
                <td>Aryan</td>
                <td>₹3,200</td>
                <td className="text-green-600 font-medium">Completed</td>
              </tr>
              <tr className="border-b">
                <td>#1002</td>
                <td>Simran</td>
                <td>₹1,450</td>
                <td className="text-yellow-600 font-medium">Pending</td>
              </tr>
              <tr>
                <td>#1003</td>
                <td>Rahul</td>
                <td>₹2,700</td>
                <td className="text-red-600 font-medium">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recent User Activity */}
        <div className="bg-white shadow rounded-2xl p-4 md:p-5">
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Recent User Activity</h3>
          <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
            <li className="flex items-center justify-between">
              <span>🟢 Neha logged in</span>
              <span className="text-gray-500 text-xs md:text-sm">2 mins ago</span>
            </li>
            <li className="flex items-center justify-between">
              <span>🟡 Arjun updated profile</span>
              <span className="text-gray-500 text-xs md:text-sm">10 mins ago</span>
            </li>
            <li className="flex items-center justify-between">
              <span>🔴 Kabir deleted account</span>
              <span className="text-gray-500 text-xs md:text-sm">1 hour ago</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Settings Quick Links */}
      <div className="bg-white shadow rounded-2xl p-4 md:p-5">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
          <Settings className="text-gray-700" size={20} />
          Quick Settings
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
          <button className="px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-xs md:text-sm">
            Manage Users
          </button>
          <button className="px-3 py-2 md:px-4 md:py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 text-xs md:text-sm">
            Add Product
          </button>
          <button className="px-3 py-2 md:px-4 md:py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 text-xs md:text-sm">
            View Reports
          </button>
          <button className="px-3 py-2 md:px-4 md:py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 text-xs md:text-sm">
            System Settings
          </button>
        </div>
      </div>
    </div>
  );
}
