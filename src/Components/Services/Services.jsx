import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    costPrice: "",
  });

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchServices();
  }, []);


const fetchServices = async () => {
  const res = await axios.get(`${BASE_URL}/services`);
  const serviceList = res.data.data;

  setServices(serviceList);

  if (serviceList.length > 0) {
    setSelectedService(serviceList[0]);
    setItems(serviceList[0].items || []);
  }
};

const loadService = (slug) => {
  const service = services.find((s) => s.slug === slug);
  if (!service) return;

  setSelectedService(service);
  setItems(service.items || []);
};

  const handleAddItem = async () => {
    if (!form.name || !form.price || !form.costPrice) {
      alert("Name, price and cost price are required");
      return;
    }

    await axios.post(
      `${BASE_URL}/service-items`,
      {
        serviceId: selectedService._id,
        name: form.name,
        price: Number(form.price),
        costPrice: Number(form.costPrice),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadService(selectedService.slug);
    setForm({ name: "", price: "", costPrice: "" });
  };

  const handleUpdate = async (id, field, value) => {
    await axios.patch(
      `${BASE_URL}/service-items/${id}`,
      { [field]: Number.isNaN(+value) ? value : Number(value) },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadService(selectedService.slug);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    await axios.delete(`${BASE_URL}/service-items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadService(selectedService.slug);
  };

  return (
    <div className="ml-24 p-6 grid grid-cols-4 gap-4">
      <div className="bg-white shadow rounded p-4">
        <h2 className="font-bold mb-3">Services</h2>
        {services.map((s) => (
          <button
            key={s._id}
            onClick={() => loadService(s.slug)}
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
                className="border p-2 rounded w-1/4"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              <input
                placeholder="Price"
                type="number"
                className="border p-2 rounded w-1/6"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
              <input
                placeholder="Cost Price"
                type="number"
                className="border p-2 rounded w-1/6"
                value={form.costPrice}
                onChange={(e) =>
                  setForm({ ...form, costPrice: e.target.value })
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
                  <th className="border p-2">Cost</th>
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
                    <td className="border p-2">
                      <input
                        type="number"
                        defaultValue={item.costPrice}
                        onBlur={(e) =>
                          handleUpdate(item._id, "costPrice", e.target.value)
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