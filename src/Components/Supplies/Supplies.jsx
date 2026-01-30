import { useEffect, useState } from "react";

export default function Supplies() {
  const [supplies, setSupplies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    total: "",
    remaining: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/api/supplies";

  const fetchSupplies = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setSupplies(data);
  };

  useEffect(() => {
    fetchSupplies();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        total: Number(form.total),
        remaining: Number(form.remaining),
      }),
    });

    setForm({ name: "", total: "", remaining: "" });
    setEditingId(null);
    fetchSupplies();
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      total: item.total,
      remaining: item.remaining,
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this supply?")) return;

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    fetchSupplies();
  };

  return (
    <div className="ml-24 p-6 min-h-screen flex justify-center">
    <div className="w-full max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Stock Management</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Item name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="total"
          placeholder="Total pieces"
          value={form.total}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="remaining"
          placeholder="Remaining pieces"
          value={form.remaining}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded col-span-1 md:col-span-1"
        >
          {editingId ? "Update Stock" : "Add Stock"}
        </button>
      </form>

      <div className="bg-white shadow rounded p-4">
        <h3 className="font-semibold mb-3">Supply List</h3>

        {supplies.map((item) => {
          return (
            <div key={item._id} className="mb-4 border-b pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.remaining} / {item.total} pcs
                  </p>
                </div>

                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}
