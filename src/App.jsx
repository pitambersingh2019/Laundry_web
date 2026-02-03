import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SideNabBar from "./Components/sidebar/SideNavBar";
import Dashboard from "./Components/dashboard/Dashboard";
import AdminLogin from "./Components/LoginPage/AdminLogin";
import { getAdmin } from "./utils/adminAuth";
import Orders from "./Components/orders/Orders";
import Customers from "./Components/customers/Customers";
import AdminOffers from "./Components/offers/AdminOffers";
import Supplies from "./Components/Supplies/Supplies";
import Services from "./Components/Services/Services";
import { Setting } from "./Components/setting/Setting";

function App() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = getAdmin();
    setAdmin(storedAdmin);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      {admin ? (
        <div className="flex min-h-screen">
          <SideNabBar />

          <div className="flex-1 bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/offers" element={<AdminOffers />} />
              <Route path="/supplies" element={<Supplies />} />
              <Route path="/services" element={<Services/>}/>
              <Route path="/Setting" element={<Setting/>}/>
              <Route path="*" element={<Navigate to={location.pathname} />} />
              
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route
            path="/AdminLogin"
            element={<AdminLogin onLogin={() => setAdmin(getAdmin())} />}
          />
          <Route path="*" element={<Navigate to="/AdminLogin" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
