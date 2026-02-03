import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import Dropdown from "../dropdown/Dropdown";
import axios from "axios";
import { BASE_URL } from "../api/api";

export default function Header() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
       const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        `${BASE_URL}/admin/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdmin(res.data);
    } catch (err) {
      console.error("Admin fetch failed", err);
    }
  };

  return (
    <div className="bg-white h-12 flex justify-between items-center px-6">
      <div className="text-2xl font-semibold text-[#1C3F6E]">
        Dashboard
      </div>

      <div className="flex items-center gap-4">
        <Bell color="#1C3F6E" size={20} />

        {admin && <Dropdown admin={admin} />}
      </div>
    </div>
  );
}
