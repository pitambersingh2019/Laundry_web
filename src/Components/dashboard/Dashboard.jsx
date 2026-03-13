import { useEffect, useState } from "react";
import Header from "../header/Header";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/orders/ordersSlice";
import UpdateStatusModal from "../Modals/UpdateStatusModal";
import { BASE_URL } from "../api/api";
import StatsCard from "./StatsCard";
import SalesIcon from "../../assets/sales.svg?react";
import BoxIcon from "../../assets/box.svg?react";
import CheckIcon from "../../assets/check.svg?react";
import WarningIcon from "../../assets/warning.svg?react";
import ArrowUpIcon from "../../assets/arrow.svg?react";
import AverageRevenueChart from "../chart/AverageRevenueChart";
import CustomerDonutChart from "../chart/CustomerDonutChart";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);
  const [statusOrder, setStatusOrder] = useState(null);
  const [supplies, setSupplies] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const res = await fetch(`${BASE_URL}/supplies`);
        const data = await res.json();
        setSupplies(data);
      } catch (err) {
        console.error("Error fetching supplies", err);
      }
    };

    fetchSupplies();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      debugger
      try {
        const res = await fetch(`${BASE_URL}/admin/customers`);
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers", err);
      }
    };
    fetchCustomers();
  }, []);

  const completedOrders = orders.filter(o => o.status === "Delivered");
  const pendingOrders = orders.filter(o => o.status === "Pickup Requested");

  const balance = completedOrders.reduce(
    (sum, o) => sum + o.grandTotal,
    0
  );

  const getMonthlyChartSeries = () => {
    debugger
    const completedCount = Array(12).fill(0);
    const orderCount = Array(12).fill(0);
    const returnCount = Array(12).fill(0);

    if (!Array.isArray(orders)) return [];

    orders.forEach((order) => {
      if (!order.createdAt) return;

      const month = new Date(order.createdAt).getMonth();

      orderCount[month] += 1;
      const serviceCost = order.services.reduce(
        (sum, s) => sum + (s.totalPrice || 0),
        0
      );

      const profit = (order.grandTotal || 0) - serviceCost;
      if (order.status === "Delivered") {
       profit
      }

      if (order.status === "Cancelled") {
        returnCount[month] += 1;
      }
    });

    return [
      { name: "Net Profit", data: completedCount },
      { name: "Total Orders", data: orderCount },
      { name: "Cancelled Orders", data: returnCount },
    ];
  };

  const chartSeries = getMonthlyChartSeries();

  const getCustomerDonutData = (customers) => {
    if (!Array.isArray(customers) || customers.length === 0) {
      return { series: [], labels: [] };
    }

    let newCustomers = 0;
    let returningCustomers = 0;

    customers.forEach((customer) => {
      if (customer.totalOrders === 1) {
        newCustomers++;
      } else if (customer.totalOrders > 1) {
        returningCustomers++;
      }
    });

    return {
      series: [newCustomers, returningCustomers],
      labels: ["New Customers", "Returning Customers"],
    };
  };
  const customerDonut = getCustomerDonutData(customers);
  return (
    <div className="ml-24 bg-[#f3fffe70] min-h-screen">
      <div className="border-b ">
        <Header />
      </div>
      <div className="pl-8  pr-8 grid grid-cols-11 gap-6 pt-8 pb-8">
        <div className="col-span-8">
          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <div className="grid p-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 bg-white rounded-md">

              <StatsCard
                title="Total Sales"
                value={`₹${balance.toLocaleString()}`}
                icon={<SalesIcon className="w-3.5 h-3.5 text-white" />}
                bg="bg-purple-200/60"
                ringBg="bg-purple-300 ring-purple-200"
                borderColor="border-purple-600"
                iconBg="bg-purple-600"
                arrow={<ArrowUpIcon className="w-8 h-8 text-[#846cf9]" />}
              />

              <StatsCard
                title="Today Orders"
                value={
                  orders.filter(
                    o =>
                      new Date(o.createdAt).toDateString() ===
                      new Date().toDateString()
                  ).length
                }
                icon={<BoxIcon className="w-3.5 h-3.5" />}
                bg="bg-orange-100/60"
                ringBg="bg-orange-200 ring-orange-100"
                borderColor="border-orange-500"
                iconBg="bg-orange-500"
                arrow={<ArrowUpIcon className="w-8 h-8 text-[#f97316]" />}
              />

              <StatsCard
                title="Completed Orders"
                value={completedOrders.length}
                icon={<CheckIcon className="w-3.5 h-3.5 text-white" />}
                bg="bg-green-100/40"
                ringBg="bg-green-200 ring-green-100"
                borderColor="border-green-600"
                iconBg="bg-green-600"
                arrow={<ArrowUpIcon className="w-8 h-8 text-[#22c55e]" />}
              />

              <StatsCard
                title="Pending Orders"
                value={pendingOrders.length}
                icon={<WarningIcon className="w-3.5 h-3.5 text-white" />}
                bg="bg-red-100/60"
                ringBg="bg-red-200 ring-red-100"
                borderColor="border-red-600"
                iconBg="bg-red-600"
                trendColor="text-red-600"
                arrow={<ArrowUpIcon className="w-8 h-8 text-[#ef4444]" />}
              />

            </div>
          )}
          <div >
            <AverageRevenueChart series={chartSeries} />
          </div>
        </div>

        <div className="col-span-3 space-y-4">
          <Card>
            <h3 className="font-semibold mb-4">Supply List</h3>

            {supplies.map((item, i) => {
              const percentage = (item.remaining / item.total) * 100;
              const isLow = percentage < 20;

              return (
                <div key={item._id || i} className="mb-3">
                  <div className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="text-gray-400">
                      {item.remaining} pcs left
                    </span>
                  </div>

                  <div className="h-2 bg-gray-100 rounded mt-1">
                    <div
                      className={`h-2 rounded ${isLow ? "bg-red-500" : "bg-orange-400"
                        }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </Card>
          <CustomerDonutChart
            series={customerDonut.series}
            labels={customerDonut.labels}
          />
        </div>

      </div>
      {statusOrder && (
        <UpdateStatusModal
          order={statusOrder}
          onClose={() => setStatusOrder(null)}
        />
      )}
    </div>
  );
}
