import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
 const res = await axios.get(`${API}/services`);
  const serviceList = res.data.data;
  setServices(serviceList);
  if (serviceList.length > 0) {
    setSelectedService(serviceList[0]);
    fetchItems(serviceList[0].slug);
  }
  };

  const fetchItems = async (slug) => {
    const res = await axios.get(`${API}/service-items/${slug}`);
    setItems(res.data);
  };

  const handleAddItem = async () => {
    await axios.post(`${API}/service-items`, {
      serviceId: selectedService._id,
      ...form,
    });
    fetchItems(selectedService.slug);
    setForm({ name: "", price: ""});
  };

  const handleUpdate = async (id, field, value) => {
    await axios.patch(`${API}/service-items/${id}`, {
      [field]: value,
    });
    fetchItems(selectedService.slug);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await axios.delete(`${API}/service-items/${id}`);
    fetchItems(selectedService.slug);
  };

  return (
    <div className="ml-24 p-6 grid grid-cols-4 gap-4">

   <div className="bg-white shadow rounded p-4">
        <h2 className="font-bold mb-3">Services</h2>
        {services.map((s) => (
          <button
            key={s._id}
            onClick={() => {
              setSelectedService(s);
              fetchItems(s.slug);
            }}
            className={`block w-full text-left p-2 rounded mb-2 ${
              selectedService?._id === s._id
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div className="col-span-3 bg-white shadow rounded p-4">
        {selectedService ? (
          <>
            <h2 className="font-bold mb-4">
              Items – {selectedService.name}
            </h2>

            <div className="flex gap-2 mb-4">
              <input
                placeholder="Item name"
                className="border p-2 rounded w-1/3"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              <input
                placeholder="Price"
                type="number"
                className="border p-2 rounded w-1/4"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
              <button
                onClick={handleAddItem}
                className="bg-green-500 text-white px-4 rounded"
              >
                Add
              </button>
            </div>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td className="border p-2">
                      <input
                        defaultValue={item.name}
                        onBlur={(e) =>
                          handleUpdate(item._id, "name", e.target.value)
                        }
                        className="w-full border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        defaultValue={item.price}
                        onBlur={(e) =>
                          handleUpdate(item._id, "price", e.target.value)
                        }
                        className="w-full border p-1"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>Select a service</p>
        )}
      </div>
    </div>
  );
}
