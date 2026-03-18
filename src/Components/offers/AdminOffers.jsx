import React, { useEffect, useState } from "react";
import {
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from "../api/offers";
import { Gift, GiftIcon } from "lucide-react";

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    expiryDate: "",
    status: "active",
  });

  const [editingId, setEditingId] = useState(null);

  const loadOffers = async () => {
    const res = await getOffers();
    setOffers(res.data.data);
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateOffer(editingId, form);
    } else {
      await createOffer(form);
    }

    setForm({
      title: "",
      code: "",
      discountType: "percentage",
      discountValue: "",
      minOrderAmount: "",
      expiryDate: "",
      status: "active",
    });
    setEditingId(null);
    loadOffers();
  };

  const handleEdit = (offer) => {
    setEditingId(offer._id);
    setForm({
      title: offer.title,
      code: offer.code,
      discountType: offer.discountType,
      discountValue: offer.discountValue,
      minOrderAmount: offer.minOrderAmount,
      expiryDate: offer.expiryDate.split("T")[0],
      status: offer.status,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this offer?")) {
      await deleteOffer(id);
      loadOffers();
    }
  };

  return (
    <div className="p-6 ml-24 ">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">  <GiftIcon />  Offers & Discounts</h2>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            name="title"
            placeholder="Offer Title"
            value={form.title}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />

          <input
            name="code"
            placeholder="Coupon Code"
            value={form.code}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />

          <select
            name="discountType"
            value={form.discountType}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="flat">Flat (₹)</option>
          </select>

          <input
            name="discountValue"
            type="number"
            placeholder="Discount Value"
            value={form.discountValue}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />

          <input
            name="minOrderAmount"
            type="number"
            placeholder="Min Order Amount"
            value={form.minOrderAmount}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />

          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 col-span-1"
          >
            {editingId ? "Update Offer" : "Create Offer"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Min Order</th>
              <th className="p-3 text-left">Expiry</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{offer.title}</td>
                <td className="p-3 font-medium">{offer.code}</td>
                <td className="p-3">
                  {offer.discountType === "percentage"
                    ? `${offer.discountValue}%`
                    : `₹${offer.discountValue}`}
                </td>
                <td className="p-3">₹{offer.minOrderAmount}</td>
                <td className="p-3">
                  {new Date(offer.expiryDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      offer.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {offer.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(offer)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(offer._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
