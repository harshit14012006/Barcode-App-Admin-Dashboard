//components/users/UserCardView
export default function UserCardView({ users, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {users.map((user) => (
        <div
          key={user._id}
          className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between border hover:shadow-lg hover:scale-[1.01] transition-all"
        >
          <div className="flex items-center gap-4 overflow-hidden">
            <div
              className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-md ${
                user.role === "admin" ? "bg-purple-600" : "bg-green-600"
              }`}
            >
              {user.role === "admin" ? "A" : "S"}
            </div>
            <div className="truncate">
              <h3 className="font-semibold text-gray-800 text-lg truncate">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {user.role}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(user)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(user._id)}
                className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 transition"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
