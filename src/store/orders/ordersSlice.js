import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Components/api/api";
export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("adminToken");

            const res = await fetch(`${BASE_URL}/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!data.success) {
                return rejectWithValue("Failed to fetch orders");
            }

            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const updateOrder = createAsyncThunk(
    "orders/updateOrder",
    async ({ orderId, updates }) => {
        const token = localStorage.getItem("adminToken");

        const res = await fetch(
            `${BASE_URL}/orders/${orderId}`,
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
        return data.data;
    }
);

export const deleteOrder = createAsyncThunk(
    "orders/deleteOrder",
    async (orderId) => {
        const token = localStorage.getItem("adminToken");

        await fetch(`${BASE_URL}/orders/${orderId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return orderId;
    }
);
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ orderId, status }) => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      `${BASE_URL}/orders/${orderId}/status`,
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
    return data.data;
  }
);
const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                const index = state.orders.findIndex(
                    (o) => o._id === action.payload._id
                );
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(
                    (o) => o._id !== action.payload
                );
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
  const index = state.orders.findIndex(
    (o) => o._id === action.payload._id
  );
  if (index !== -1) {
    state.orders[index] = action.payload;
  }
});
    },
});

export default ordersSlice.reducer;
