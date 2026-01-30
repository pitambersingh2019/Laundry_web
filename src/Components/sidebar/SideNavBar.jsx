import {
  LayoutGrid,
  Archive,
  Users,
  Package,
  Settings,
  BadgePercent, 
  Boxes 
} from "lucide-react";
import logo from "../../assets/LP_logo.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function SideNabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <LayoutGrid size={20} /> },
    { name: "Orders", path: "/orders", icon: <Archive size={20} /> },
    { name: "Customers", path: "/customers", icon: <Users size={20} /> },
    { name: "Services", path: "/services", icon: <Package size={20} /> },
    { name: " Offers & Discounts", path: "/offers", icon: <BadgePercent  size={20} /> },
    { name: "Supplies", path: "/supplies", icon: <Boxes   size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-24 h-screen bg-white border-r flex flex-col justify-between fixed ">
      <div>
        <div className="flex justify-center border-b">
          <img
            src={logo}
            alt="LaundryPad"
            className="w-20 h-12 object-contain"
          />
        </div>

        <div className="mt-4 flex flex-col gap-2 pl-2">
          {menu.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full py-3 flex flex-col items-center gap-1 rounded-l-xl transition
                  ${
                    isActive
                      ? "bg-[#1C3F6E] text-white"
                      : "text-[#1C3F6E] hover:bg-gray-100"
                  }
                `}
              >
                {item.icon}
                <span className="text-xs">{item.name}</span>
              </button>
            );
          })}
        </div> 
      </div>
    </div>
  );
}
