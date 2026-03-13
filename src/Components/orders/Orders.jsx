import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  MoreVertical,
  Download,
  Pencil,
  Trash2,
} from "lucide-react";
import { fetchOrders } from "../../store/orders/ordersSlice";
import EditOrderModal from "../Modals/EditOrderModal";
import UpdateStatusModal from "../Modals/UpdateStatusModal";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";
import { deleteOrder } from "../../store/orders/ordersSlice";
import { STATUS_OPTIONS } from "../Modals/StatusOptions";
import { BASE_URL } from "../api/api";

export default function Orders() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);
  const [deleteOrderItem, setDeleteOrderItem] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusOrder, setStatusOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter(
    (o) =>
      o.userName?.toLowerCase().includes(search.toLowerCase()) ||
      o._id?.includes(search)
  );

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getStatusColor = (status) => {
    const found = STATUS_OPTIONS.find((s) => s.label === status);
    return found ? found.color : "bg-gray-100 text-gray-600";
  };

  const downloadInvoice = (id) => {
    const url = `${BASE_URL}/orders/invoice/${id}/pdf`;
    window.open(url, "_blank");
  };

  return (
    <div className=" ml-24 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Order Management</h1>
      </div>

      <div className="relative w-72 mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by name or order id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        {loading ? (
          <p className="p-4">Loading orders...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Items</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Paid</th>
                <th className="px-4 py-3 text-left">Pickup Spot</th>
                <th className="px-4 py-3 text-left">Pickup Address</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    #{order._id.slice(-6)}
                  </td>

                  <td className="px-4 py-3">
                    {formatDate(order.createdAt)}
                  </td>

                  <td className="px-4 py-3">
                    {order.services?.length || 0}
                  </td>

                  <td className="px-4 py-3">
                    ₹{order.grandTotal}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                        }`}
                    >
                      {order.status === "Delivered" ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {order.pickup?.spot || "-"}
                  </td>

                  <td className="px-4 py-3 max-w-64">
                    <p className="line-clamp-3 text-gray-700">
                      {order.pickup?.address || "-"}
                    </p>
                    {order.pickup && (
                      <p className="text-xs text-gray-500 mt-1">
                        {order.pickup.day}, {order.pickup.date} • {order.pickup.time}
                      </p>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      onClick={() => setStatusOrder(order)}
                      className={`text-[10px] px-2 py-[2px] rounded-full font-medium cursor-pointer 
    ${getStatusColor(order.status)}
  `}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 relative">
                    <MoreVertical
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(
                          openMenuId === order._id ? null : order._id
                        );
                      }}
                    />

                    {openMenuId === order._id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                        <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100" onClick={() => downloadInvoice(order._id)}>
                          <Download size={14} /> Invoice
                        </button>

                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsEditOpen(true);
                            setOpenMenuId(null);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteOrderItem(order);
                            setOpenMenuId(null);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center p-6 text-gray-400"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isEditOpen && (
        <EditOrderModal
          order={selectedOrder}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      {statusOrder && (
        <UpdateStatusModal
          order={statusOrder}
          onClose={() => setStatusOrder(null)}
        />
      )}

      {deleteOrderItem && (
        <DeleteConfirmModal
          title="Delete Order"
          description={
            <>
              Are you sure you want to delete this order?
              <br />
              <span className="font-medium text-gray-800">
                Order ID: #{deleteOrderItem._id.slice(-6)}
              </span>
            </>
          }
          onCancel={() => setDeleteOrderItem(null)}
          onConfirm={() => {
            dispatch(deleteOrder(deleteOrderItem._id));
            setDeleteOrderItem(null);
          }}
        />
      )}

    </div>
  );
}
