// components/users/UserCardView.jsx
import { Pencil, Trash2 } from "lucide-react";

export default function UserCardView({ users, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {users.map((user) => (
        <div
          key={user._id}
          className="bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Profile Section */}
          <div className="flex items-center gap-4 overflow-hidden">
            <div
              className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold text-lg shadow-lg
              ${user.role === "admin"
                ? "bg-gradient-to-r from-orange-500 to-orange-600"
                : "bg-gradient-to-r from-green-500 to-green-600"}`}
            >
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div className="truncate">
              <h3 className="font-semibold text-gray-800 text-lg truncate">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          </div>

          {/* Role + Actions */}
          <div className="flex items-center justify-between mt-5">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize 
              ${user.role === "admin"
                ? "bg-orange-100 text-orange-700"
                : "bg-green-100 text-green-700"}`}
            >
              {user.role}
            </span>

            <div className="flex gap-2">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
