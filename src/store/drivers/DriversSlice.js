import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Components/api/api";

export const fetchDrivers = createAsyncThunk(
  "drivers/fetchDrivers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${BASE_URL}/drivers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch drivers");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDriver = createAsyncThunk(
  "drivers/updateDriver",
  async ({ driverId, updates }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${BASE_URL}/drivers/${driverId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updates),
        }
      );

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDriver = createAsyncThunk(
  "drivers/deleteDriver",
  async (driverId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");

      await fetch(`${BASE_URL}/drivers/${driverId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return driverId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateApproveDriverStatus = createAsyncThunk(
  "drivers/updateApproveDriverStatus",
  async ({ driverId, isApproved }, { rejectWithValue }) => {
    try {

      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${BASE_URL}/drivers/${driverId}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isApproved }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update approval");
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateDriverStatus = createAsyncThunk(
  "drivers/updateDriverStatus",
  async ({ driverId, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${BASE_URL}/drivers/${driverId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addDriver = createAsyncThunk(
  "drivers/addDriver",
  async (driverData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${BASE_URL}/drivers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(driverData),
      });

      if (!res.ok) {
        throw new Error("Failed to add driver");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const DriverSlice = createSlice({
  name: "drivers",
  initialState: {
    drivers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateApproveDriverStatus.fulfilled, (state, action) => {
      const updatedDriver = action.payload;

      const index = state.drivers.findIndex(
        (driver) => driver._id === updatedDriver._id
      );

      if (index !== -1) {
        state.drivers[index] = updatedDriver;
      }
    })
      .addCase(addDriver.fulfilled, (state, action) => {
        state.drivers.unshift(action.payload);
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDriver.fulfilled, (state, action) => {
        const index = state.drivers.findIndex(
          (d) => d._id === action.payload._id
        );
        if (index !== -1) {
          state.drivers[index] = action.payload;
        }
      })

      .addCase(deleteDriver.fulfilled, (state, action) => {
        state.drivers = state.drivers.filter(
          (d) => d._id !== action.payload
        );
      })

      .addCase(updateDriverStatus.fulfilled, (state, action) => {
        const index = state.drivers.findIndex(
          (d) => d._id === action.payload._id
        );
        if (index !== -1) {
          state.drivers[index] = action.payload;
        }
      });
  },
});

export default DriverSlice.reducer;