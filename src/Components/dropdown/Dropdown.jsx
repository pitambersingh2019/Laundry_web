import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { LogOutModal } from "../Modals/LogOutModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dropdown({ admin }) {
  const [logOut, setLogOut] = useState(false);
  const navigate = useNavigate();

  const IMAGE_BASE_URL = "http://localhost:5000"; 

  const fullName = admin
    ? `${admin.firstName || ""} ${admin.lastName || ""}`
    : "Admin";

  const profileImageUrl = admin?.profileImage
    ? `${IMAGE_BASE_URL}${admin.profileImage}`
    : "https://ui-avatars.com/api/?name=Admin&background=1C3F6E&color=fff";

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex items-center gap-2 rounded-full px-3 py-1 hover:bg-gray-100">
        <img
          src={profileImageUrl}
          alt="admin"
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://ui-avatars.com/api/?name=Admin&background=1C3F6E&color=fff";
          }}
        />

        <span className="text-sm font-medium text-gray-700">
          {fullName}
        </span>

        <ChevronDown size={16} className="text-gray-400" />
      </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
        <MenuItem>
          <button
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            onClick={() => navigate("/setting")}
          >
            Account Settings
          </button>
        </MenuItem>

        <MenuItem>
          <button
            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
            onClick={() => setLogOut(true)}
          >
            Logout
          </button>
        </MenuItem>
      </MenuItems>

      {logOut && (
        <LogOutModal
          setLogOut={setLogOut}
          handleLogout={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        />
      )}
    </Menu>
  );
}
