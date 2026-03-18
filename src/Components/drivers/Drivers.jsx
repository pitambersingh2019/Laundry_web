import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDrivers,
  updateApproveDriverStatus,
} from "../../store/drivers/DriversSlice";
import AddDriverModal from "./AddDriverModal";
import ToggleSwitch from "../../utils/ToggleSwitch";

export const Drivers = () => {
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [selectedDriver, setSelectedDriver] = React.useState(null);
  const [updatingDriverId, setUpdatingDriverId] = React.useState(null);

  const { drivers, loading, error } = useSelector(
    (state) => state.drivers
  );

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  const handleApproveToggle = async (driver) => {
    if (updatingDriverId === driver._id) return;

    setUpdatingDriverId(driver._id);

    try {
      await dispatch(
        updateApproveDriverStatus({
          driverId: driver._id,
          isApproved: !driver.isApproved,
        })
      ).unwrap();
    } catch (err) {
      console.error("Approval update failed:", err);
      alert("Failed to update driver approval.");
    } finally {
      setUpdatingDriverId(null);
    }
  };

  const handleRowClick = (driver) => {
    setSelectedDriver(driver);
    setShowAddModal(true);
  };

  return (
    <div className="ml-24 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Drivers List</h1>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          onClick={() => {
            setSelectedDriver(null);
            setShowAddModal(true);
          }}
        >
          Add Driver
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Driver Name</th>
              <th className="px-4 py-3 text-left">Register Date</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Approve</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            )}

            {!loading &&
              drivers.map((driver, index) => (
                <tr
                  key={driver._id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(driver)}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{driver.name}</td>
                  <td className="px-4 py-3">
                    {new Date(driver.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{driver.email}</td>
                  <td className="px-4 py-3">{driver.phone || "-"}</td>

                  <td
                    className="px-4 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ToggleSwitch
                      checked={driver.isApproved}
                      disabled={updatingDriverId === driver._id}
                      onChange={() => handleApproveToggle(driver)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {showAddModal && (
        <AddDriverModal
          driver={selectedDriver}
          onClose={() => {
            setShowAddModal(false);
            setSelectedDriver(null);
          }}
        />
      )}
    </div>
  );
};