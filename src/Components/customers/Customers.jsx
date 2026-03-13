import { useEffect, useState } from "react";
import CustomersTable from "./CustomersTable";
import CustomerModal from "./CustomerModal";
import { BASE_URL } from "../api/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loadingCustomer, setLoadingCustomer] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await fetch(`${BASE_URL}/admin/customers`);
    const data = await res.json();
    setCustomers(data);
  };
  const handleRowClick = async (customer) => {
    try {
      setLoadingCustomer(true);

      const res = await fetch(
        `${BASE_URL}/admin/customers/${customer._id}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch customer");
      }

      const data = await res.json();
      setSelectedCustomer(data);
    } catch (error) {
      console.error("Failed to load customer details", error);
    } finally {
      setLoadingCustomer(false);
    }
  };

  return (
    <div className="p-6 ml-24">
      <h1 className="text-2xl font-semibold mb-4">Customers</h1>

      <CustomersTable
        customers={customers}
        onRowClick={handleRowClick}
      />

      {loadingCustomer && (
        <p className="mt-4 text-sm text-gray-500">
          Loading customer details...
        </p>
      )}

      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}
