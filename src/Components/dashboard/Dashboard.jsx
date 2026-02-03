import { useEffect, useState } from "react";
import Header from "../header/Header";
import Card from "./Card";
import { Clock, ShoppingBag, TriangleAlert, X } from "lucide-react";
import SmallCard from "./SmallCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/orders/ordersSlice";
import { useNavigate } from "react-router-dom";
import UpdateStatusModal from "../Modals/UpdateStatusModal";
import { STATUS_OPTIONS } from "../Modals/StatusOptions";
import { BASE_URL } from "../api/api";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);
  const [statusOrder, setStatusOrder] = useState(null);
  const [supplies, setSupplies] = useState([]);
  const navigate = useNavigate();

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

  const completedOrders = orders.filter(o => o.status === "Delivered");
  const pendingOrders = orders.filter(o => o.status === "Pickup Requested");
  const progressOrders = orders.filter(o => o.status === "Cleaning In Progress");
  const cancelOrders = orders.filter(o => o.status === "Cancelled");

  const getStatusColor = (status) => {
    const found = STATUS_OPTIONS.find((s) => s.label === status);
    return found ? found.color : "bg-gray-100 text-gray-600";
  };
  const balance = completedOrders.reduce(
    (sum, o) => sum + o.grandTotal,
    0
  );

  const unpaidTotal = orders
    .filter(o => o.status !== "Delivered")
    .reduce((sum, o) => sum + o.grandTotal, 0);

  const formatDate = (date) =>
    new Date(date)
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .toLowerCase();
  return (
    <div className="ml-24 bg-[#f3fffe70] min-h-screen">
      <div className="border-b ">
        <Header />
      </div>
      <div className="pl-8  pr-8 grid grid-cols-11 gap-6 pt-6">
        <div className="col-span-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl mb-4 font-semibold text-[#1C3F6E]">Orders</h2>
            {orders.length > 4 && (
              <div className="text-[#1C3F6E] cursor-pointer" onClick={() => navigate("/orders")}>
                View All
              </div>
            )}
          </div>
          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {orders.slice(0, 4).map((order) => {
                const firstService = order.services?.[0];

                return (
                  <Card
                    key={order._id}
                    className="h-[170px] flex flex-col justify-between"
                  >

                    <div className="flex justify-between items-center">
                      <p className="text-[11px] text-gray-400">
                        #{order._id.slice(-5)}
                      </p>

                      <span
                        onClick={() => setStatusOrder(order)}
                        className={`text-[10px] px-2 py-[2px] rounded-full font-medium cursor-pointer 
    ${getStatusColor(order.status)}
  `}
                      >
                        {order.status}
                      </span>


                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {order.createdAt && formatDate(order.createdAt)}
                    </p>

                    <h3 className="font-semibold text-sm text-gray-900">
                      {order.userName}
                    </h3>

                    <p className="text-sm text-gray-500 leading-tight">
                      Ironing Items :{firstService?.itemName || "No Item"}
                    </p>

                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      ₹{order.grandTotal}
                    </p>
                  </Card>
                );
              })}
            </div>
          )}
          <div className="pt-6 grid grid-cols-2 gap-4">

            <div>
              <Card className="!bg-[#1E3A5F] text-white">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm opacity-80">Balance</p>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    Last 7 Days
                  </span>
                </div>

                <h2 className="text-2xl font-bold">  ₹{balance.toLocaleString()}</h2>
              </Card>
              <div className="pt-6">
                <Card>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm text-gray-500">Unpaid Orders</p>
                    <span className="text-xs text-gray-400">Last 7 Days</span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800">₹{unpaidTotal.toLocaleString()}</h2>
                </Card>
              </div>
            </div>
            <div className="bg-white rounded-lg mb-4">
              <SmallCard
                label="Pending Orders"
                count={pendingOrders.length}
                icon={<TriangleAlert color="goldenrod" />}
              />

              <SmallCard
                label="On Progress Orders"
                count={progressOrders.length}
                icon={<Clock color="orangered" />}
              />

              <SmallCard
                label="Finished Orders"
                count={completedOrders.length}
                icon={<ShoppingBag color="forestgreen" />}
              />
              <SmallCard
                label="Cancle Orders"
                count={cancelOrders.length}
                icon={<X color="red" />}
              />

            </div>
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
                    ></div>
                  </div>
                </div>
              );
            })}
          </Card>
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
