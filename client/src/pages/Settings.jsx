export default function Settings() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">⚙️ Settings Page</h2>
      <p className="mb-4">Configure system preferences here.</p>

      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Store Name</label>
          <input type="text" placeholder="Enter Store Name" className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Currency</label>
          <select className="w-full border p-2 rounded">
            <option>₹ INR</option>
            <option>$ USD</option>
            <option>€ EUR</option>
          </select>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
