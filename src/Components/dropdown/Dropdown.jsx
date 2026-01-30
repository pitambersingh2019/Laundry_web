import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({ admin }) {
  const fullName = `${admin.firstName} ${admin.lastName}`;

  return (
    <Menu as="div" className="relative inline-block text-left">
      
      <MenuButton className="flex items-center gap-2 rounded-full px-3 py-1 hover:bg-gray-100">
        <img
          src={
            admin.profileImage ||
            "https://ui-avatars.com/api/?name=L+A&background=1C3F6E&color=fff"
          }
          alt="admin"
          className="w-8 h-8 rounded-full object-cover"
        />

        <span className="text-sm font-medium text-gray-700">
          {fullName}
        </span>

        <ChevronDown size={16} className="text-gray-400" />
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
        <MenuItem>
          <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
            Account Settings
          </button>
        </MenuItem>

        <MenuItem>
          <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
            Support
          </button>
        </MenuItem>

        <MenuItem>
          <button
            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
