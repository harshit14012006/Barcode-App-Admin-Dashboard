//components/users/UserTableView
export default function UserTableView({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl">
      <table className="w-full text-left border-collapse">
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
              className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}
            >
              <td className="px-6 py-3 font-medium text-gray-800">
                {user.name}
              </td>
              <td className="px-6 py-3 text-gray-600">{user.email}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-3 flex gap-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
