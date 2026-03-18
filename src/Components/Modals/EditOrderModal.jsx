import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../store/orders/ordersSlice";


export default function EditOrderModal({ order, onClose }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(order.status);
  const [pickupSpot, setPickupSpot] = useState(order.pickup?.spot || "");
  const [pickupTime, setPickupTime] = useState(order.pickup?.time || "");
  const [notes, setNotes] = useState(order.pickup?.notes || "");
const handleSave = () => {
  dispatch(
    updateOrderStatus({
      orderId: order._id,
      status: status
    })
  );

  onClose();
};


  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">Edit Order</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-5 space-y-4 text-sm">
          <div>
            <label className="block text-gray-500 mb-1">Customer</label>
            <input
              value={order.userName}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-500 mb-1">Order Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Pickup Requested">Pickup Requested</option>
              <option value="Pickup Scheduled">Pickup Scheduled</option>
              <option value="Picked Up">Picked Up</option>
              <option value="Cleaning In Progress">Cleaning In Progress</option>
              <option value="Ready for Delivery">Ready for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-500 mb-1">Pickup Spot</label>
            <input
              value={pickupSpot}
              onChange={(e) => setPickupSpot(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-500 mb-1">Pickup Time</label>
            <input
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="6pm - 8pm"
            />
          </div>

          <div>
            <label className="block text-gray-500 mb-1">Notes</label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
