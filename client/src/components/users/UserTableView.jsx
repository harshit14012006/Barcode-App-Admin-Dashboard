// components/users/UserTableView.jsx
import { Pencil, Trash2 } from "lucide-react";

export default function UserTableView({ users, onEdit, onDelete }) {
  if (!users || users.length === 0) {
    return (
      <div className="bg-white border rounded-xl shadow-md p-6 text-center text-gray-500">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl border">
      {/* Desktop Table */}
      <table className="hidden sm:table w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-6 py-3 text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-sm font-semibold">Email</th>
            <th className="px-6 py-3 text-sm font-semibold">Role</th>
            <th className="px-6 py-3 text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr
              key={user._id}
              className={`${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-green-50 transition`}
            >
              <td className="px-6 py-3 font-medium text-gray-800 truncate max-w-[180px]">
                {user.name}
              </td>
              <td className="px-6 py-3 text-gray-600 truncate max-w-[220px]">
                {user.email}
              </td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    user.role === "admin"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-3 flex gap-2">
                <button
                  onClick={() => onEdit(user)}
                  className="px-3 py-1.5 flex items-center gap-1 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-xs hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-sm"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => onDelete(user._id)}
                  className="px-3 py-1.5 flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-xs hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-sm"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3 p-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white border rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition"
          >
            <div>
              <span className="text-xs font-semibold text-gray-500">Name:</span>
              <p className="text-gray-800 font-medium">{user.name}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Email:</span>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Role:</span>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-xs font-medium capitalize ${
                  user.role === "admin"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.role}
              </span>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onEdit(user)}
                className="flex-1 px-3 py-1.5 flex items-center justify-center gap-1 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 transition shadow-sm"
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                onClick={() => onDelete(user._id)}
                className="flex-1 px-3 py-1.5 flex items-center justify-center gap-1 bg-orange-500 text-white rounded-lg text-xs hover:bg-orange-600 transition shadow-sm"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
