import { Check, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../store/orders/ordersSlice";
import { STATUS_OPTIONS } from "./StatusOptions";

export default function UpdateStatusModal({ order, onClose }) {
  const dispatch = useDispatch();

  const handleStatusClick = (status) => {
    if (status === order.status) return;

    dispatch(
      updateOrderStatus({
        orderId: order._id,
        status,
      })
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">

      <div className="bg-white w-auto max-w-fit rounded-xl shadow-lg">

        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">Update Status</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-5 flex flex-wrap gap-3">
          {STATUS_OPTIONS.map((s) => {
            const isActive = s.label === order.status;

            return (
              <button
                key={s.label}
                onClick={() => handleStatusClick(s.label)}
                disabled={isActive}
                className={`
                  inline-flex items-center
                  px-4 py-2
                  rounded-lg border
                  text-sm font-medium
                  whitespace-nowrap
                  transition
                  ${
                    isActive
                      ? s.active
                      : `${s.color} hover:opacity-90`
                  }
                `}
              >
                {s.label}
                {isActive && (
                  <Check  className="ml-2 text-xs font-normal"/>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
