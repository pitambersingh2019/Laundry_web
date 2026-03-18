export default function CustomerModal({ customer, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-lg shadow-lg relative flex flex-col">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Customer Details</h2>
        </div>

        <div className="p-6 overflow-y-auto">

          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Total Orders:</strong> {customer.totalOrders}</p>
            <p><strong>Total Spent:</strong> ₹{customer.totalSpent}</p>
          </div>

          <hr className="my-4" />

          <h3 className="font-semibold mb-2">Orders</h3>

          {customer.orders?.length === 0 ? (
            <p className="text-sm text-gray-500">No orders found</p>
          ) : (
            customer.orders.map((order) => (
              <div
                key={order._id}
                className="border rounded p-3 mb-2 text-sm bg-gray-50"
              >
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ₹{order.grandTotal}</p>
                <p>
                  <strong>Pickup:</strong> {order.pickup?.date} at {order.pickup?.time}
                </p>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}
