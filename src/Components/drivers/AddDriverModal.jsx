import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addDriver,
  updateDriver,
} from "../../store/drivers/DriversSlice";

export default function AddDriverModal({ driver, onClose }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (driver) {
      setName(driver.name || "");
      setEmail(driver.email || "");
      setPhone(driver.phone || "");
      setPassword("");
    }
  }, [driver]);

  const handleSave = () => {
    if (driver) {
      dispatch(
        updateDriver({
          id: driver._id,
          name,
          email,
          phone,
          password,
        })
      );
    } else {
      dispatch(
        addDriver({
          name,
          email,
          phone,
          password,
        })
      );
    }

    handleClose();
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">

        <form autoComplete="off">

          <div className="flex justify-between items-center px-5 py-4 border-b">
            <h2 className="text-lg font-semibold">
              {driver ? "Edit Driver" : "Add Driver"}
            </h2>
            <button type="button" onClick={handleClose}>
              <X />
            </button>
          </div>

          <div className="p-5 space-y-4 text-sm">

            <input type="text" name="fakeuser" style={{ display: "none" }} />
            <input type="password" name="fakepass" style={{ display: "none" }} />

            <div>
              <label className="block text-gray-500 mb-1">
                Driver Name
              </label>
              <input
                name="driver_name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-gray-500 mb-1">
                Email Address
              </label>
              <input
                name="driver_email"
                autoComplete="new-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!driver}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-gray-500 mb-1">
                Mobile Number
              </label>
              <input
                name="driver_phone"
                autoComplete="off"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-gray-500 mb-1">
                Password (optional)
              </label>
              <input
                type="password"
                name="driver_password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="Leave blank to keep unchanged"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 px-5 py-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}