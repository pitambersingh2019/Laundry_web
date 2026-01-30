export default function CustomersTable({ customers, onRowClick }) {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-500">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Orders</th>
            <th className="p-3">Spent</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer._id}
              onClick={() => onRowClick(customer)}
              className="cursor-pointer hover:bg-gray-50 border-b"
            >
              <td className="p-3">
                {customer.firstName} {customer.lastName}
              </td>
              <td className="p-3">{customer.email}</td>
              <td className="p-3">{customer.phone}</td>
              <td className="p-3">{customer.totalOrders}</td>
              <td className="p-3">₹{customer.totalSpent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
